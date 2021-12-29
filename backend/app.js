require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const { db } = require('./config/mysql');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const apiPaths = {
    users: '/api/1.0/users',
    cards: '/api/1.0/cards'
}

const userRoutes = require('./app/routes/cards')
app.use(apiPaths.cards, userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('API lista por el puerto', PORT)
})