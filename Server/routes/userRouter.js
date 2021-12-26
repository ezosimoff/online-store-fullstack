const Router = require('express')
const router = new Router()

router.post('/registration')
router.get('/login')
router.get('/auth', (req, res) => {
    res.json({massage: 'User Router'})
})

module.exports = router