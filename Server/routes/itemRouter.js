const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')

router.post('/', itemController.create)
router.delete('/:id', itemController.delete)
router.get('/:id', itemController.getOne)
router.get('/', itemController.getAll)

module.exports = router