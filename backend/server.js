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
    password: 'A', // Muokkaa oma salasanasi tähän kun demoat itsellesi oki?
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

-- Lisää muutama rivi tauluun 'ukot'
INSERT INTO ukot (Nimi, Osumia_kaveriin) VALUES ('Matti', 30);
INSERT INTO ukot (Nimi, Osumia_kaveriin) VALUES ('Teppo', 35);
INSERT INTO ukot (Nimi, Osumia_kaveriin) VALUES ('Seppo', 40);


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


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    let tulos;
    db.query('SELECT * FROM tunnukset WHERE user = ? AND pass= ?', [username,password], (error, results) => {
        if (error) {
            res.status(500).json({error: 'Solmuun meni'});
            return;
        }
        if (results.length === 1){
            res.status(200).json({message:"Tuttu mies"});
        }
        if (results.length === 0) {
            res.status(401).json({error: "Väärä salasana tahi ukko"});
        }

    });



});


app.listen(8081, ()=>{
    console.log("Listening")
})