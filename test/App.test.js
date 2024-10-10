// Importamos la función 'request' de la librería 'supertest' para realizar peticiones HTTP en nuestros tests
import request from 'supertest'
// Importamos la aplicación 'app' y el servidor 'server' desde el archivo '../app.js'
import { app, server } from '../app.js'
// Importamos el modelo de meme desde '../models/memeModels.js'
import memeModel from '../models/memeModels.js'
// Importamos la conexión a la base de datos desde '../database/connectionDb.js'
import { connection_db } from '../database/connectionDb.js'

// Comenzamos a describir los tests para los endpoints de la API
describe('API endpoints', () => {
    // Describimos los tests específicos para la API de memes
    describe('Meme API', () => {
        // Declaramos una variable para almacenar el ID de un meme creado durante los tests
        let createdMemeId

        // Describimos los tests para el endpoint GET /api/v1/memes
        describe('GET /api/v1/memes', () => {
            // Test para verificar que se devuelven todos los memes
            test('should return all memes', async () => {
                // Realizamos una petición GET al endpoint
                const response = await request(app).get('/api/v1/memes')
                // Verificamos que el status de la respuesta sea 200 (OK)
                expect(response.body.status).toBe(200)
                // Verificamos que el tipo de contenido sea JSON
                expect(response.type).toBe('application/json')
                // Verificamos que la propiedad 'ok' en el cuerpo de la respuesta sea true
                expect(response.body.ok).toBe(true)
                // Verificamos que el cuerpo de la respuesta contenga un array
                expect(Array.isArray(response.body.body)).toBe(true)
            })
        })

        // Describimos los tests para el endpoint GET /api/v1/memes/:id
        describe('GET /api/v1/memes/:id', () => {
            // Test para verificar que se devuelve un meme por su ID
            test('should return a meme by id', async () => {
                // Creamos un meme de prueba en la base de datos
                const meme = await memeModel.create({
                    name: 'Test Meme',
                    image: 'https://example.com/test.jpg',
                })
                // Realizamos una petición GET al endpoint con el ID del meme creado
                const response = await request(app).get(
                    `/api/v1/memes/${meme.id}`
                )
                // Verificamos que el status de la respuesta sea 200 (OK)
                expect(response.status).toBe(200)
                // Verificamos que el tipo de contenido sea JSON
                expect(response.type).toBe('application/json')
                // Verificamos que la propiedad 'ok' en el cuerpo de la respuesta sea true
                expect(response.body.ok).toBe(true)
                // Verificamos que el nombre del meme en la respuesta sea correcto
                expect(response.body.body.name).toBe('Test Meme')
            })

            // Test para verificar que se devuelve un 404 si el meme no se encuentra
            test('should return 404 if meme not found', async () => {
                // Realizamos una petición GET al endpoint con un ID que no existe
                const response = await request(app).get('/api/v1/memes/9999')
                // Verificamos que el status de la respuesta sea 404 (Not Found)
                expect(response.status).toBe(404)
            })
        })

        // Describimos los tests para el endpoint POST /api/v1/memes
        describe('POST /api/v1/memes', () => {
            // Test para verificar que se crea un nuevo meme
            test('should create a new meme', async () => {
                // Definimos los datos para el nuevo meme
                const newMeme = {
                    name: 'New Meme',
                    image: 'https://example.com/new.jpg',
                }
                // Realizamos una petición POST al endpoint con los datos del nuevo meme
                const response = await request(app)
                    .post('/api/v1/memes')
                    .send(newMeme)
                // Verificamos que el status de la respuesta sea 201 (Created)
                expect(response.status).toBe(201)
                // Verificamos que el tipo de contenido sea JSON
                expect(response.type).toBe('application/json')
                // Verificamos que la propiedad 'ok' en el cuerpo de la respuesta sea true
                expect(response.body.ok).toBe(true)
                // Verificamos que el nombre del meme en la respuesta sea correcto
                expect(response.body.body.name).toBe('New Meme')
                // Guardamos el ID del meme creado para usarlo en tests posteriores
                createdMemeId = response.body.body.id
            })

            // Test para verificar que se devuelve un 400 si falta el nombre o la imagen
            test('should return 400 if name or image is missing', async () => {
                // Definimos un meme inválido sin la propiedad 'image'
                const invalidMeme = { name: 'Invalid Meme' }
                // Realizamos una petición POST al endpoint con los datos inválidos
                const response = await request(app)
                    .post('/api/v1/memes')
                    .send(invalidMeme)
                // Verificamos que el status de la respuesta sea 400 (Bad Request)
                expect(response.status).toBe(400)
            })
        })

        // Describimos los tests para el endpoint PUT /api/v1/memes/:id
        describe('PUT /api/v1/memes/:id', () => {
            // Test para verificar que se actualiza un meme existente
            test('should update an existing meme', async () => {
                const meme = await memeModel.create({
                    name: 'Test Meme',
                    image: 'https://example.com/test.jpg',
                })

                // Definimos los datos actualizados para el meme
                const updatedMeme = {
                    name: 'Test Meme',
                    image: 'https://example.com/updated.jpeg',
                }
                // Realizamos una petición PUT al endpoint con los datos actualizados
                const response = await request(app)
                    .put(`/api/v1/memes/${meme.id}`)
                    .send(updatedMeme)
                // Verificamos que el status de la respuesta sea 200 (OK)
                expect(response.status).toBe(200)
                // Verificamos que el tipo de contenido sea JSON
                expect(response.type).toBe('application/json')
                // Verificamos que la propiedad 'ok' en el cuerpo de la respuesta sea true
                expect(response.body.ok).toBe(true)
                // Verificamos que el nombre del meme en la respuesta sea el actualizado
                expect(response.body.meme.image).toBe(
                    'https://example.com/updated.jpeg'
                )
            })

            // Test para verificar que se devuelve un 404 si el meme no se encuentra
            test('should return 404 if meme not found', async () => {
                // Definimos datos para actualizar un meme que no existe
                const updatedMeme = {
                    name: 'Non-existent Meme',
                    image: 'https://example.com/non-existent.jpg',
                }
                // Realizamos una petición PUT al endpoint con un ID que no existe
                const response = await request(app)
                    .put('/api/v1/memes/9999')
                    .send(updatedMeme)
                // Verificamos que el status de la respuesta sea 404 (Not Found)
                expect(response.status).toBe(404)
            })
        })

        // Describimos los tests para el endpoint DELETE /api/v1/memes/:id
        describe('DELETE /api/v1/memes/:id', () => {
            // Test para verificar que se elimina un meme existente
            test('should delete an existing meme', async () => {
                // Realizamos una petición DELETE al endpoint con el ID del meme creado anteriormente
                const response = await request(app).delete(
                    `/api/v1/memes/${createdMemeId}`
                )
                // Verificamos que el status de la respuesta sea 200 (OK)
                expect(response.status).toBe(200)
                // Verificamos que el tipo de contenido sea JSON
                expect(response.type).toBe('application/json')
                // Verificamos que la propiedad 'ok' en el cuerpo de la respuesta sea true
                expect(response.body.ok).toBe(true)
                // Verificamos que el mensaje en la respuesta sea correcto
                expect(response.body.message).toBe('Meme deleted successfully')
            })

            // Test para verificar que se devuelve un 404 si el meme no se encuentra
            test('should return 404 if meme not found', async () => {
                // Realizamos una petición DELETE al endpoint con un ID que no existe
                const response = await request(app).delete('/api/v1/memes/9999')
                // Verificamos que el status de la respuesta sea 404 (Not Found)
                expect(response.status).toBe(404)
            })
        })

        afterEach(async () => {
            await memeModel.destroy({ where: { name: 'Test Meme' } })
        })
        // Después de todos los tests, cerramos el servidor y la conexión a la base de datos
        afterAll(async () => {
            await server.close()
            await connection_db.close()
        })
    })
})
