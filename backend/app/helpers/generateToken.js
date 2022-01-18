const jwt = require('jsonwebtoken') 
const authConfig = require('../../config/auth')

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, authConfig)
    } catch (e) {
        return null
    }
}

module.exports = { verifyToken }