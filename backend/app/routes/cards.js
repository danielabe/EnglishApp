const express = require('express')
const router = express.Router()
const { getCards, createCard, deleteCard, updateCard } = require('../controllers/cards')
const { validatePhrase } = require('../middleware/validatePhrase')

router.get('/', getCards)

router.post('/', validatePhrase, createCard)

router.delete('/:id', deleteCard)

router.put('/:id', updateCard)

/* router.get('/:id', getItem) */

module.exports = router