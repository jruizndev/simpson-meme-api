import connection_db from './database/connectionDb.js'
import memeModel from './models/memeModels.js'

try {
    await connection_db.authenticate()
    console.log('conexión exitosa 🚀')
    await memeModel.sync({ force: true })
    console.log('La tabla fue creada con éxito')
} catch (error) {
    console.error('conexión fallida 🚫', error)
}
