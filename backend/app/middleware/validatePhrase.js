const cardsModel = require('../models/cards')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const validatePhrase = async (req, res, next) => {
    try{
        const { word } = req.body
        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.verify(token, authConfig.secret)
        await cardsModel.findAll({ where: { user_id: user.id }}, { attributes: ['word'] })
        .then(cards => {
            const cardsArray = cards.map(card => card.word)
            
            if(!cardsArray.includes(word)) next()
            else res.status(409).send({Error: 'That phrase already exists'}).end()
        })
    } catch(e) {
        console.log(e)
        res.status(400).send({ Error: 'Something happened' })
    }
} 

module.exports = { validatePhrase }