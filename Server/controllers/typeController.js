const {Type} = require('../models/models')
const ApiError = require('../error')

class TypeController {
    async create(req, res, next) {
        try {   
            const {name} = req.body
            const type = await Type.create({name})
            return res.json(type)
        } catch (e) {
           next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        const types = await Type.findAndCountAll()
        return res.json(types)
    }
    async getOne(req, res) {
        const {id} = req.params
        const type = await Type.findOne({where:{id}})
        return res.json(type)
    }
    async delete(req, res) {
        const {id} = req.query
        const deletedType = await Type.destroy({where:{id}})
        return res.json(deletedType)
    }
}

module.exports = new TypeController()