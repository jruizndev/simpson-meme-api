import memeModel from '../models/memeModels.js'

// Obtener todos los memes
export const getAllMemes = async (req, res) => {
    try {
        const memes = await memeModel.findAll()
        res.status(200).json({
            ok: true,
            status: 200,
            body: memes,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Internal Server Error',
            error: error.message,
        })
    }
}

// Obtener un meme por ID
export const getMemeById = async (req, res) => {
    const id = req.params.meme_id
    try {
        const meme = await memeModel.findOne({ where: { meme_id: id } })
        if (!meme) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Meme not found',
            })
        }
        res.status(200).json({
            ok: true,
            status: 200,
            body: meme,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Internal Server Error',
            error: error.message,
        })
    }
}

// Crear un nuevo meme
export const createMeme = async (req, res) => {
    const memeData = req.body

    // Validación de datos
    if (!memeData.name || !memeData.urlImage) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: 'Name and URL image are required.',
        })
    }

    try {
        const createMeme = await memeModel.create({
            name: memeData.name,
            urlImage: memeData.urlImage,
        })

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Meme Created',
            body: createMeme,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Internal Server Error',
            error: error.message,
        })
    }
}

// Actualizar un meme
export const updateMeme = async (req, res) => {
    const id = req.params.meme_id
    const memeData = req.body

    // Validación de datos
    if (!memeData.name || !memeData.urlImage) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: 'Name and URL image are required.',
        })
    }

    try {
        const updateMeme = await memeModel.update(
            {
                name: memeData.name,
                urlImage: memeData.urlImage,
            },
            {
                where: {
                    meme_id: id,
                },
            }
        )

        if (updateMeme[0] === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Meme not found or no changes made.',
            })
        }
        const updatedMeme = await memeModel.findOne({ where: { meme_id: id } })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Meme updated successfully',
            meme: updatedMeme,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'An error occurred while updating the meme.',
            error: error.message,
        })
    }
}

// Eliminar un meme por ID
export const deleteMeme = async (req, res) => {
    const id = req.params.meme_id
    try {
        const meme = await memeModel.findOne({ where: { meme_id: id } })
        if (!meme) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Meme not found',
            })
        }

        await memeModel.destroy({ where: { meme_id: id } })
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Meme deleted successfully',
            deletedMeme: meme,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'An error occurred while deleting the meme',
            error: error.message,
        })
    }
}
