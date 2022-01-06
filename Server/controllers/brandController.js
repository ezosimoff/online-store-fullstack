const { Brand } = require("../models/models")
const ApiError = require('../error')

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const brand = await Brand.create({name})
            res.json(brand)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req, res) {
        const brand = await Brand.findAll()
        return res.json(brand)
    }
    async getOne(req, res) {
        const brand = await Brand.findOne({where:{id: req.params.id}})
        return res.json(brand)
    }
    async delete(req, res) {
        const brand = await Brand.findOne({where:{id: req.params.id}})
        await Brand.destroy({where:{id: req.params.id}})
        return res.status(200).json({message: "deleted brand " + brand.name})
    }
}

module.exports = new BrandController()