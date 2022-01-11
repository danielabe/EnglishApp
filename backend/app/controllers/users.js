const { httpError } = require('../helpers/handleError')
const { db } = require("../../config/mysql")
const usersModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')


const createUser = async (req, res) => {

    try {
        const { firstname, lastname, email, password } = req.body
        const passwordhash = await bcrypt.hash(password, 10)
        const role = "user"

        await usersModel.create({ firstname, lastname, email, passwordhash, role },
            { fields: ['firstname', 'lastname', 'email', 'passwordhash', 'role'] })
            .then(newUser => {
                /* const result = JSON.stringify(newUser) */
                const { id, firstname, lastname, email, role } = newUser
                console.log({ id, firstname, lastname, email, role })
                const token = jwt.sign({ id, firstname, lastname, email, role }, authConfig.secret)
                res.status(201).json({ id, firstname, lastname, email, role, token })
            })

    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
}

const logIn = async (req, res) => {
    const { email, password } = req.body

    try {
        usersModel.findOne({ where: { email: email }})
            .then(user => {
                if(!user) {
                    res.status(404).json('User not found')
                } else {
                    bcrypt.compare(password, user.passwordhash, function(err, result) {
                        if(result) {
                            const { id, firstname, lastname, email, role } = user
                            const token = jwt.sign({ id, firstname, lastname, email, role }, authConfig.secret)
                            res.status(200).json({ id, firstname, lastname, email, role, token: token })
                        } else {
                            res.status(401).json('Wrong data')
                        }
                    });

                }
            })
    
    } catch (e) {
        httpError(res, e)
    }
}

const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.verify(token, authConfig.secret)
        usersModel.findOne({ where: { id: user.id }})
            .then(user => {
                const { id, firstname, lastname, email, role } = user
                res.status(200).json({ id, firstname, lastname, email, role })
            })
    
    } catch (e) {
        httpError(res, e)
    }
}


module.exports = { createUser, logIn, getUser  }
