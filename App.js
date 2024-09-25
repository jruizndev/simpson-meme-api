import express from 'express'
import { initializeDatabase } from './database/connectionDb.js' //
import memeRouter from './routers/memeRouters.js'

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.use('/api/v1', memeRouter)

const startServer = async () => {
    try {
        await initializeDatabase()
        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port} 🚀`)
        })
    } catch (error) {
        console.error('No se pudo iniciar el servidor 🚫:', error)
    }
}

startServer()
