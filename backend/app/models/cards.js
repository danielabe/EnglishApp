const { db } = require('../../config/mysql')
const { Sequelize } = require('sequelize')

const cardsModel = db.define('cards', {
    "id": {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    "word": Sequelize.STRING,
    "phonetic": Sequelize.STRING,
    "definition": Sequelize.STRING,
    "example": Sequelize.STRING,
    "audio": Sequelize.STRING,
    "user_id": Sequelize.INTEGER,
    "qualification": Sequelize.INTEGER,
    "date": Sequelize.STRING,
})

module.exports = cardsModel