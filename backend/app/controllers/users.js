const { httpError } = require('../helpers/handleError')
const { db } = require("../../config/mysql")
const usersModel = require('../models/users')
const bcrypt = require('bcrypt')


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
                res.status(201).json({ id, firstname, lastname, email, role })
            })
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
}

module.exports = { createUser }