import { Router } from 'express'
import {
    getAllMemes,
    getMemeById,
    createMeme,
    deleteMeme,
    updateMeme,
} from '../controllers/memeControllers.js'

const router = Router()

router.get('/memes', getAllMemes)
router.get('/memes/:meme_id', getMemeById)
router.post('/memes', createMeme)
router.delete('/memes/:meme_id', deleteMeme)
router.put('/memes/:meme_id', updateMeme)

export default router
