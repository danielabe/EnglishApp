const { QueryTypes } = require('sequelize')
const { httpError } = require('../helpers/handleError')
const { db } = require("../../config/mysql")
const cardsModel = require('../models/cards')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const getCards = async (req, res) => {
    try {
        cardsModel.findAll({ attributes: ['id', 'word', 'definition', 'example', 'audio'] })
            .then(cards => {
                const results = JSON.stringify(cards)
                console.log(results)
                res.status(200).json(cards)
            })
    } catch (e) {
        httpError(res, e)
    }
}

const createCard = async (req, res) => {
    let { word, definition, example, audio } = req.body
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, authConfig.secret)

    example = example == 'undefined' ? '' : example
    example = example == 'undefined' ? '' : example

    try {
        await cardsModel.create({ word, definition, example, audio, user_id: user.id },
            { fields: ['word', 'definition', 'example', 'audio', 'user_id'] })
            .then(card => {
                const result = JSON.stringify(card)
                console.log(result)
                res.status(201).json(card)
            })

    } catch (e) {
        httpError(res, e)
    }
}

const deleteCard = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, authConfig.secret)
    console.log(user)
    console.log(req.params.id)
    try {
        await cardsModel.destroy({ where: { id: req.params.id, user_id: user.id } })
            .then(card => {
                console.log(card)
                res.status(200).json(card)
            })
    } catch (e) {
        httpError(res, e)
    }
}

const updateCard = async (req, res) => {
    console.log(req.body)
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, authConfig.secret)
    try {
        await cardsModel.update({
            definition: req.body.definition,
            example: req.body.example,
            qualification: req.body.qualification
        }, {
            where: {
                id: req.params.id,
                user_id: user.id
            }
        })
            .then(card => {
                console.log(card)
                res.status(200).json(card)
            })
    } catch (e) {
        httpError(res, e)
    }
}

module.exports = { getCards, createCard, deleteCard, updateCard }