const express = require('express')
const router = express.Router()
const { createUser, logIn, getUser } = require('../controllers/users')
/* const checkOrigin = require('../middleware/origin') */

router.post('/register', createUser)

router.post('/login', logIn) 

router.get('/:id', getUser)//seguir con esto
/* router.get('/', getCards)

router.post('/', createCard) */

/* router.get('/:id', getItem)

router.patch('/:id', updateItem)

router.delete('/:id', deleteItem) */

module.exports = router






/* app.post('/users/register', filterAdmin, validateFirstname,  validateLastname, validateEmail, 
validatePassword, async (req, res) => {
    const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        perfil: req.body.perfil,
        password: req.body.password
    }
    createUser(newUser, req, res)
}) */

//login
/* app.post('/users/login', validateLogin, async (req, res) => {
    const { username, password } = req.body
    selectUserLogin(username, password, req, res)
})

app.use(verifyToken) */