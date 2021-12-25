const Router = require('express')
const router = new Router()

router.use('/user')
router.use('/type')
router.use('/basket')
router.use('/brand')
router.use('/item')

module.exports = router