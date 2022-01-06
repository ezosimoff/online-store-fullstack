const uuid = require("uuid")
const path = require("path")
const { Item } = require("../models/models")
const { Img } = require("../models/models")
const ApiError = require("../error")

class ItemController {
    async create(req, res, next) {
        try {
            const { name, price, typeId, brandId, info } = req.body

            let { img } = req.files
            let itemName = name.replace(/ /g, "_")
            let fileName = uuid.v4() + `_${itemName}.jpg`

            img.mv(path.resolve(__dirname, "..", "static", fileName))
            const item = await Item.create({ name, price, typeId, brandId })
            const image = await Img.create({ name: fileName, itemId: item.id })

            return res.json({ item, image })
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        let { limit, page } = req.query
        page |= 1
        let offset = page * limit - limit
        let item
        let where = {}
        try {
            if (Object.keys(req.query).length == 0) {
                item = await Item.findAll({
                    include: { model: Img },
                    offset,
                    limit,
                })
            } else {
                for (const key in req.query) {
                    if (key == "limit" || key == "page") continue
                    where[key] = req.query[key]
                }
            }
            item = await Item.findAll({
                where,
                include: { model: Img },
                offset,
                limit,
            })
            return res.json(item)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getOne(req, res) {
        const item = await Item.findOne({ where: { id: req.params.id } })
        return res.json({ item })
    }
    async delete(req, res) {
        const deletedItem = await Item.findOne({ where: { id: req.params.id } })
        Item.destroy({ where: { id: req.params.id } })
        return res.json(deletedItem.name)
    }
}

module.exports = new ItemController()
