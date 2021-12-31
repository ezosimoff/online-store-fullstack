const uuid = require('uuid')
const path = require('path')
const { Item } = require('../models/models')
const { Img } = require('../models/models')
const ApiError = require('../error')


class ItemController {
    async create(req, res, next) {
        try {
            const {name, price, typeId, brandId, info} = req.body
                        
            let {img} = req.files
            let itemName = name.replace(/ /g,"_")
            let fileName = uuid.v4() + `_${itemName}.jpg`

            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Item.create({name, price, typeId, brandId})
            const image = await Img.create({name: fileName, itemId: item.id})
    
            return res.json({item, image})
        } 
        catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        let item;
        let where = {};
        try {

            if (Object.keys(req.query).length == 0 ) { 
                item = await Item.findAll({include:{model: Img}})
            } else {
                for (const key in req.query) {
                    where[key] = req.query[key] 
                }
            }
            item = await Item.findAll({where, include:{model:Img}})
    
            return res.json(item)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getOne(req, res) {
        const {id} = req.params
        const item = await Item.findOne({where:{id}})

        return res.json({item})
    }
    async delete(req, res) {
        const {id} = req.params
        const deletedItem = await Item.destroy({where:{id}})
        return res.json(deletedItem)
    }

}

module.exports = new ItemController()