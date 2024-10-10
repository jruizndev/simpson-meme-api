import express from 'express'
import { initializeDatabase } from './database/connectionDb.js' //
import memeRouter from './routers/memeRouters.js'
import memeModel from './models/memeModels.js'
import cors from 'cors'

export const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/v1', memeRouter)

export let server

export const startServer = async () => {
    try {
        await initializeDatabase()
        server = app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port} 🚀`)
        })
    } catch (error) {
        console.error('No se pudo iniciar el servidor 🚫:', error)
    }
}

startServer()
