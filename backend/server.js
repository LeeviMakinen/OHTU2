const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'A', // Modify your password here
    database: 'testi'
});

/*-- Luo tietokanta, jos sitä ei ole olemassa
CREATE DATABASE IF NOT EXISTS testi;

-- Käytä luotua tietokantaa
USE testi;

-- Luo taulu 'ukot', jos sitä ei ole olemassa
CREATE TABLE IF NOT EXISTS ukot (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nimi VARCHAR(255),
    Osumia_kaveriin INT
);

-- Luo taulu 'tunnukset', jos sitä ei ole olemassa
CREATE TABLE IF NOT EXISTS tunnukset (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(255),
    pass VARCHAR(255)
);

-- Lisää muutama rivi tauluun 'ukot'
INSERT INTO ukot (Nimi, Osumia_kaveriin) VALUES ('Matti', 30);
INSERT INTO ukot (Nimi, Osumia_kaveriin) VALUES ('Teppo', 35);
INSERT INTO ukot (Nimi, Osumia_kaveriin) VALUES ('Seppo', 40);

-- Luo taulu 'date_ranges', jos sitä ei ole olemassa
CREATE TABLE IF NOT EXISTS date_ranges (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    StartDate DATE,
    EndDate DATE,
    TripName VARCHAR(255)
);
*/
db.connect(function (err) {
    if (err) console.log("Database connection failed");
    else console.log("Database connected");
});



app.get('/', (req, res) => {
    return res.json({
        message: 'Tervetuloa bäkkärin autokaistalle',
        links: [
            { rel: 'self', href: '/' },
            { rel: 'ukot', href: '/ukot' },
            { rel: 'register', href: '/register' },
            { rel: 'login', href: '/login' },
            { rel: 'date_ranges', href: '/date_ranges' }
        ]
    });
});

app.get('/ukot', (req, res) => {
    const sql = "SELECT * FROM ukot";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        const responseData = {
            data: data,
            links: [
                { rel: 'self', href: '/ukot' },
                { rel: 'create', href: '/lisaarivi', method: 'POST' }
            ]
        };
        return res.json(responseData);
    });
});

app.post('/lisaarivi', (req, res) => {
    const { sqlStatement } = req.body;
    db.query(sqlStatement, (err, result) => {
        if (err) { return res.status(500).json({ error: err.message }); }
        console.log(result);
        res.json(result);
    });
});

app.post('/register', (req, res) => {
    const { sqlStatement } = req.body;
    db.query(sqlStatement, (err, result) => {
        if (err) { return res.status(500).json({ error: err.message }); }
        console.log(result);
        res.json(result);
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM tunnukset WHERE user = ? AND pass = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            if (result.length > 0) {
                res.json({ success: true, user: result[0] });
            } else {
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
        }
    });
});

app.post('/save-dates', (req, res) => {
    try {
        const { startDate, endDate, tripName } = req.body;
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const insertDatesSQL = 'INSERT INTO date_ranges (StartDate, EndDate, TripName) VALUES (?, ?, ?)';
        db.query(insertDatesSQL, [startDateObj, endDateObj, tripName], (error) => {
            if (error) {
                console.error('Error inserting dates into date_ranges:', error);
                res.status(500).json({ success: false, message: 'Failed to save dates to the database' });
            } else {
                res.json({ success: true, message: 'Dates saved successfully' });
            }
        });
    } catch (error) {
        console.error('Error parsing dates:', error);
        res.status(400).json({ success: false, message: 'Invalid date format in the request' });
    }
});

app.get('/date_ranges', (req, res) => {
    const sql = 'SELECT StartDate, EndDate, TripName FROM date_ranges';
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching dates from date_ranges:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            res.json(data);
        }
    });
});

app.delete('/delete-trip/:tripName', (req, res) => {
    const tripName = req.params.tripName;

    const deleteTripSQL = 'DELETE FROM date_ranges WHERE TripName = ?';
    db.query(deleteTripSQL, [tripName], (error, result) => {
        if (error) {
            console.error('Error deleting trip from date_ranges:', error);
            res.status(500).json({ success: false, message: 'Failed to delete trip from the database' });
        } else {
            if (result.affectedRows > 0) {
                res.json({ success: true, message: 'Trip deleted successfully' });
            } else {
                res.status(404).json({ success: false, message: 'Trip not found' });
            }
        }
    });
});


app.listen(8081, () => {
    console.log("Listening on port 8081");
});
