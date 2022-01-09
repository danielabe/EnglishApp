const { QueryTypes } = require('sequelize')
const { httpError } = require('../helpers/handleError')
const { db } = require("../../config/mysql")
const cardsModel = require('../models/cards')


const getCards = async (req, res) => {
    try {
        /* const cards = await db.query(`
        SELECT * FROM cards
        `, {
            type: QueryTypes.SELECT
        })
        res.status(200).json(cards) */

        cardsModel.findAll({ attributes: ['id', 'word', 'definition', 'example', 'audio'] })
            .then(cards => {
                const results = JSON.stringify(cards)
                console.log(results)
                res.status(200).json(cards)
            })
        /* .catch(error => {
            console.log(error)
        }) */
    } catch (e) {
        httpError(res, e)
    }
}

const createCard = async (req, res) => {
    const { word, definition, example, audio } = req.body
    try {
        await cardsModel.create({ word, definition, example, audio },
            { fields: ['word', 'definition', 'example', 'audio'] })
            .then(card => {
                const result = JSON.stringify(card)
                console.log(result)
                res.status(201).json(card)
            })

    } catch (e) {
        httpError(res, e)
    }
}

module.exports = { getCards, createCard }