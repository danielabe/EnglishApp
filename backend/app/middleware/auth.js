const { verifyToken } = require('../helpers/generateToken')

const checkAuth = async (req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        console.log(tokenData)
        if (tokenData._id) {
            next()
        } else {
            res.status(409).send({ Error: 'Tu por aqui no pasas1!' })
        }
    } catch (e) {
        console.log(e)
        res.status(409).send({ Error: 'Tu por aqui no pasas2!' })
    }
}

module.exports = { checkAuth }