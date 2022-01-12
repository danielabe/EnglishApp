const express = require('express')
const router = express.Router()
const { getCards, createCard, deleteCard } = require('../controllers/cards')
/* const checkOrigin = require('../middleware/origin') */

router.get('/', getCards)

router.post('/', createCard)

router.delete('/:id', deleteCard)

/* router.get('/:id', getItem)

router.patch('/:id', updateItem)

router.delete('/:id', deleteItem) */

module.exports = router