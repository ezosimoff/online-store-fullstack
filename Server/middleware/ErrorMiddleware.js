const ApiError = require('../error')

module.exports = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({massage: err.massage, status: err.status})
    }
    return res.status(500).json({massage: 'Ooooooops, что-то сломалось :\'('})
}