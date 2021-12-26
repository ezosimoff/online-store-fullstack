require('dotenv').config()
const exporess = require('express')
const cors = require('cors')
const sequelize = require('./DB')
const models = require('./models/models')
const app = exporess()
const router = require('./routes/index')

app.use(cors())
app.use(exporess.json())
app.use('/shop', router)

app.get('/', (req, res) => {
    res.status(200).json({massage: 'ответ сервера'})
}) 

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT , () => console.log(`Сервер запущен на порту ${process.env.PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()
