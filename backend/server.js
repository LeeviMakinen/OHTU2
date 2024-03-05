const express = require('express');
const bodyParser = require('body-parser');

const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json());

const db =mysql.createConnection({

    host: "localhost",
    user: 'root',
    password: 'Hur1ssalon5ale', // Muokkaa oma salasanasi tähän kun demoat itsellesi oki?
    database: 'testi'

});

/*

TIET0KANTASKRIPTI DEMOAMISTA VARTEN
-- Luo tietokanta, jos sitä ei ole olemassa
CREATE DATABASE IF NOT EXISTS testi;

-- Käytä luotua tietokantaa
USE testi;

-- Luo taulu 'ukot', jos sitä ei ole olemassa
CREATE TABLE IF NOT EXISTS ukot (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nimi VARCHAR(255),
    Osumia_kaveriin INT
);

CREATE TABLE IF NOT EXISTS `tunnukset` (
  `user` text DEFAULT NULL,
  `pass` text DEFAULT NULL
);

-- Lisää muutama rivi tauluun 'ukot'
INSERT INTO ukot (Nimi, Osumia_kaveriin) VALUES ('Matti', 30);
INSERT INTO ukot (Nimi, Osumia_kaveriin) VALUES ('Teppo', 35);
INSERT INTO ukot (Nimi, Osumia_kaveriin) VALUES ('Seppo', 40);

-- Luo taulu 'date_ranges', jos sitä ei ole olemassa
CREATE TABLE IF NOT EXISTS date_ranges (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    StartDate DATE,
    EndDate DATE
);

 */

db.connect(function(err){
    if(err) console.log("Tilanne seis");
    console.log("Database connected");

})

app.get('/',(re,res)=>{

    return res.json('Bäkkärin autokaista päivää')
} )

app.get('/ukot', (req,res)=>{
    const sql = "SELECT * FROM ukot";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/lisaarivi', (req,res) => {
    const {sqlStatement} = req.body;


    db.query(sqlStatement, (err,result) =>{
        if(err) {return res.status(500).json({error:err.message});}

        console.log(result);
        res.json(result);
    })

})

app.post('/register', (req,res) => {
    const {sqlStatement} = req.body;


    db.query(sqlStatement, (err,result) =>{
        if(err) {return res.status(500).json({error:err.message});}

        console.log(result);
        res.json(result);
    })

})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query the database for user credentials
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
        const { startDate, endDate } = req.body;

        // Convert startDate and endDate to JavaScript Date objects
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        // Insert the start and end dates into the date_ranges table
        const insertDatesSQL = 'INSERT INTO date_ranges (StartDate, EndDate) VALUES (?, ?)';
        db.query(insertDatesSQL, [startDateObj, endDateObj], (error) => {
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


app.listen(8081, ()=>{
    console.log("Listening")
})