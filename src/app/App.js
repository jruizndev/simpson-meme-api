const express = require('express')
const morgan = require('morgan')

const router = require('../router/meme-route.js')

const app = express();

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hola Mister Jhon Express')
})

app.use(express.json()) // fundamental para poder leer los cuerpos de los memes
app.use('/api/v1', router)
module.exports = app;




























/*import connection_db from '../database/connectionDb.js'
import memeModel from '../models/memeModels.js'

try {
    await connection_db.authenticate()
    console.log('conexión exitosa 🚀')
    await memeModel.sync({ force: true })
    console.log('La tabla fue creada con éxito')
} catch (error) {
    console.error('conexión fallida 🚫', error)
}*/
