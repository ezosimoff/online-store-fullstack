const Router = require('express')

const router = new Router()
const userRouter = require('./userRouter')
const itemRouter = require('./itemRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const basketRouter = require('./basketRouter')

router.use('/basket', basketRouter)
router.use('/brand', brandRouter)
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/items', itemRouter)

module.exports = router