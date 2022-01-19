require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const { db } = require('./config/mysql');

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(cors());
app.use(helmet());
app.use(express.json());

const apiPaths = {
    users: '/api/1.0/users',
    cards: '/api/1.0/cards'
}

const cardsRoutes = require('./app/routes/cards')
const usersRoutes = require('./app/routes/users')
app.use(apiPaths.cards, cardsRoutes);
app.use(apiPaths.users, usersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server started on port', PORT)
})