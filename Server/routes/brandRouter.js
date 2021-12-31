const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')

router.post('/', brandController.create)
router.get('/')
router.get('/:id')
router.delete('/:id')

module.exports = router