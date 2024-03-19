const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const PORT = 8081;

const app = express();


app.use(cors());
app.use(express.json());


app.use('/backend/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'A', // Salis :D:D:D:D:
    database: 'testi'
});

/*
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS testi;

-- Use the created database
USE testi;

-- Create table 'ukot' if it doesn't exist
CREATE TABLE IF NOT EXISTS ukot (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nimi VARCHAR(255),
    Osumia_kaveriin INT
);

-- Create table 'tunnukset' if it doesn't exist
CREATE TABLE IF NOT EXISTS tunnukset (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(255),
    pass VARCHAR(255)
);

-- Create table 'date_ranges' if it doesn't exist
CREATE TABLE IF NOT EXISTS date_ranges (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    StartDate DATE,
    EndDate DATE,
    TripName VARCHAR(255)
);

-- Create table 'blog_posts' if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data into 'ukot' table
INSERT INTO ukot (Nimi, Osumia_kaveriin) VALUES ('Matti', 30);
INSERT INTO ukot (Nimi, Osumia_kaveriin) VALUES ('Teppo', 35);
INSERT INTO ukot (Nimi, Osumia_kaveriin) VALUES ('Seppo', 40);
*/

// Configure Multer for file backend/uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'backend/uploads/'); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename for uploaded files
    }
});
const upload = multer({ storage: storage });





// Ensure the connection to the database
db.connect(function (err) {
    if (err) console.log("Database connection failed");
    else console.log("Database connected");
});

// Endpoint to save a new blog post



app.post('/blog-posts', upload.single('image'), (req, res) => {
    const { content } = req.body;
    const imageUrl = req.file.path; // Path to the uploaded image

    const sql = 'INSERT INTO blog_posts (content, image) VALUES (?, ?)';
    db.query(sql, [content, imageUrl], (err, result) => {
        if (err) {
            console.error('Error saving blog post:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            res.status(201).json({ success: true, message: 'Blog post created successfully' });
        }
    });
});


// Postauksen päivityksen endpoint
app.put('/blog-posts/:id', upload.single('image'), (req, res) => {
    const { id } = req.body;
    const { content } = req.body;
    let imageUrl = null;
    if(req.file){
        imageUrl = req.file.path; // Path to the uploaded image
    }





    const updatePostSQL = 'UPDATE blog_posts SET content = ?,image = ? WHERE id = ?';
    db.query(updatePostSQL, [content,imageUrl, id], (error) => {
        if (error) {
            console.error('Error updating blog post:', error);
            res.status(500).json({ success: false, message: 'Failed to update blog post in the database' });
        } else {
            res.json({ success: true, message: 'Blog post updated successfully' });
        }
    });
});

// Hakee vanhat postaukset
app.get('/blog-posts', (req, res) => {
    const sql = 'SELECT * FROM blog_posts ORDER BY created_at DESC';
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching blog posts:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            res.json(data);
        }
    });
});

// Endpoint to delete a blog post
app.delete('/blog-posts/:id', (req, res) => {
    const postId = req.params.id;
    const deletePostSQL = 'DELETE FROM blog_posts WHERE id = ?';
    db.query(deletePostSQL, [postId], (error) => {
        if (error) {
            console.error('Error deleting blog post:', error);
            res.status(500).json({ success: false, message: 'Failed to delete blog post from the database' });
        } else {
            res.json({ success: true, message: 'Blog post deleted successfully' });
        }
    });
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



// Listen on port 8081
app.listen(8081, () => {
    console.log("Listening on port 8081");
});