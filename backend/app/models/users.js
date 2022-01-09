const { db } = require('../../config/mysql')
const { Sequelize } = require('sequelize')

const usersModel = db.define('users', {
    "id": {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    "firstname": Sequelize.STRING,
    "lastname": Sequelize.STRING,
    "email": Sequelize.STRING,
    "passwordhash": Sequelize.STRING,
    "role": Sequelize.STRING,
})

module.exports = usersModel