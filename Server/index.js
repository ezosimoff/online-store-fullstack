require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const sequelize = require('./DB')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorMiddleware')
const path = require('path')
const ApiError = require('./error')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/shop', router)

app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        // await sequelize.sync()
        app.listen(process.env.PORT, () => console.log(`Сервер запущен на порту ${process.env.PORT}`))
    } catch (error) {
       return ApiError.internal(error.message)
    }
}

start()
