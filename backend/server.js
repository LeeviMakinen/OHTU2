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
    password: 'toot',
    database: 'testi'

});

db.connect(function(err){
    if(err) console.log("Tilanne seis");
    console.log("Database connected");

})

app.get('/',(re,res)=>{

    return res.json("Bäkkärin autokaista päivää")
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


app.listen(8081, ()=>{
    console.log("Listening")
})