const Router = require('express')
const userContrioller = require('../controllers/userController')
const router = new Router()

router.post('/registration', userContrioller.registration)
router.post('/login', userContrioller.login)
router.get('/auth', userContrioller.checkAuth)

module.exports = router