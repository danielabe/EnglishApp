const httpError = (res, err) => {
    console.groupCollapsed(err)
    res.status(500)
    res.send({ error: 'Algo ocurrió'})
}

module.exports = { httpError }