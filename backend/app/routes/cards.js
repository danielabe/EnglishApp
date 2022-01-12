const express = require('express')
const router = express.Router()
const { getCards, createCard, deleteCard, updateCard } = require('../controllers/cards')
/* const checkOrigin = require('../middleware/origin') */

router.get('/', getCards)

router.post('/', createCard)

router.delete('/:id', deleteCard)

router.put('/:id', updateCard)

/* router.get('/:id', getItem)

router.patch('/:id', updateItem)

router.delete('/:id', deleteItem) */

module.exports = router