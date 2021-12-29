const { QueryTypes } = require("sequelize")
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const cors = require('cors');
//const { db } = require('./config/mysql');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

//db();
app.listen(PORT, () => {
    console.log('API lista por el puerto', PORT)
})

// get the client
/* const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ret54yaf6',
  database: 'english_app'
});

connection.connect((error) => {
    if(error){
        throw error;
    } else {
        console.log('CONEXIÓN EXITOSA')
    }
});
connection.end(); */




const { db } = require('./config/mysql');
app.get('/cards', async (req, res) => {
    getCards(req, res)
})

async function getCards(req, res) {
    const cards = await db.query(`
    SELECT * FROM cards
    `, { 
        type: QueryTypes.SELECT 
    })
    res.status(200).json(cards)
}