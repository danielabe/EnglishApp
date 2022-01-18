const usersModel = require('../models/users')

const validateUser = async (req, res, next) => {
    try{
        const { firstname, lastname, email, password } = req.body
        const emailTest = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)
        const passwordTest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(password)

        await usersModel.findAll({ attributes: ['email'] })
        .then(users => {
            const emailsArray = users.map(user => user.email)
            if(!emailsArray.includes(email)) {
                if(firstname && lastname && emailTest && passwordTest) next()
                else {
                    let errors = []
                    if(!firstname) errors.push('Wrong firstname')
                    if(!lastname) errors.push('Wrong lastname')
                    if(!emailTest) errors.push('Wrong email') 
                    if(!passwordTest) errors.push('Wrong password') 
                    res.status(400).send({ Error: errors })
                }
            } else res.status(409).send({Error: 'The email already exists'}).end()
        })

    } catch(e) {
        console.log(e)
        res.status(400).send({ Error: 'Something happened' })
    }
} 

// Minimum 4 characters
// Maximum 15 characters
// At least 1 character
// At least 1 digit
// No blank spaces

module.exports = { validateUser }