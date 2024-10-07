import request from 'supertest'
import { app } from '../App'
import memeModel from '../models/memeModels'

//* Test petición GET*\\
describe('CRUD memes', () => {
    test('should return a response with a status 200 and type json', async () => {
        const response = await request(app).get('/api/v1/memes')
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
    })
})

//* Test petición GET BY ID*\\
describe('CRUD meme by Id', () => {
    test('should return a response with a status 200 and type json', async () => {
        const response = await request(app).get('/api/v1/memes/9')
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
    })
    test('should return 404 if meme not found', async () => {
        const response = await request(app).get('/api/v1/memes/9999')
        expect(response.status).toBe(404)
    })
})

//* Test petición POST *\\
describe('CRUD create meme (POST)', () => {
    test('should create a new meme and return a response with status 201 and type json', async () => {
        const newMeme = {
            name: 'Homer',
            image: 'https://example.com/meme.jpg',
        }

        const response = await request(app).post('/api/v1/memes').send(newMeme)

        expect(response.status).toBe(201)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveProperty('ok', true)
        expect(response.body).toHaveProperty('message', 'Meme Created')
        expect(response.body.body).toHaveProperty('id')
    })

    test('should return 400 if name or image is missing', async () => {
        const invalidMeme = {
            name: '',
            image: 'https://thesimpsons.com',
        }
        const response = await request(app)
            .post('/api/v1/memes')
            .send(invalidMeme)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0]).toHaveProperty(
            'msg',
            'El nombre es obligatorio'
        )
    })
})

describe('CRUD delete meme (DELETE)', () => {
    test('Check that the meme is deleted', async () => {
        // Crear un meme primero
        const newMeme = await memeModel.create({
            name: 'Test Meme to Delete',
            image: 'https://example.com/test-meme.jpg',
        })

        // Realizar la petición DELETE con el ID del meme creado
        await request(app)
            .delete(`/api/v1/memes/${newMeme.id}`) // Usamos el id del meme que acabamos de crear
            .expect('Content-Type', /json/)
            .expect(200) // Esperamos un código 200
            .expect((res) => {
                // Comprobamos que el mensaje de éxito sea el esperado
                expect(res.body.ok).toBe(true)
                expect(res.body.message).toBe('Meme deleted successfully')
            })

        // Verificamos que el meme ya no existe en la base de datos
        const deletedMeme = await memeModel.findByPk(newMeme.id)
        expect(deletedMeme).toBeNull() // El meme debería haber sido eliminado
    }, 10000) // Incrementamos el timeout a 10 segundos
})
