const express = require('express')
const router = express.Router()
const { createUser, logIn, getUser, getCardsFromUser } = require('../controllers/users')
const { checkAuth } = require('../middleware/auth')
const { validateUser } = require('../middleware/validateUser')

router.post('/register', validateUser, createUser)

router.post('/login', logIn) 

router.get('/:id', getUser)

router.get('/:id/cards', getCardsFromUser)

/* router.get('/', getCards) */

/* router.delete('/:id', deleteItem) */

module.exports = router