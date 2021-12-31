const { Brand } = require("../models/models")

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})

        res.json(brand)
    }
    async getAll(req, res) {

    }
    async getOne(req, res) {

    }
    async delete(req, res) {

    }
}

module.exports = new BrandController()