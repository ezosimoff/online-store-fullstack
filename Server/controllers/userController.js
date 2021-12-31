const ApiError = require('../error')

class UserController {
    async registration(req, res) {

    }
    async login(req, res) {

    }
    checkAuth(req, res, next) {
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('не задан ID'))
        }
        res.json(id)
    }
}


module.exports = new UserController()