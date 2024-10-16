import memeModel from "../models/memeModels.js";

// Obtener todos los memes
export const getAllMemes = async (req, res) => {
  try {
    const memes = await memeModel.find();
    res.status(200).json({
      ok: true,
      status: 200,
      body: memes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Obtener un meme por ID
export const getMemeById = async (req, res) => {
  const id = req.params.id;
  try {
    const meme = await memeModel.findById(id);
    if (!meme) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Meme not found",
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: meme,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Crear un nuevo meme
export const createMeme = async (req, res) => {
  const memeData = req.body;

  // Validación de datos
  if (!memeData.name || !memeData.image) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: "Name and URL image are required.",
    });
  }

  try {
    const createMeme = await memeModel.create({
      name: memeData.name,
      image: memeData.image,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      message: "Meme Created",
      body: createMeme,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Actualizar un meme
export const updateMeme = async (req, res) => {
  const id = req.params.id;
  const memeData = req.body;

  // Validación de datos
  if (!memeData.name || !memeData.image) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: "Name and URL image are required.",
    });
  }

  try {
    const updatedMeme = await memeModel.findByIdAndUpdate(id,
      {
        name: memeData.name,
        image: memeData.image,
      },
      { new: true }
    );

    if (!updateMeme) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Meme not found or no changes made.",
      });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Meme updated successfully",
      meme: updatedMeme,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "An error occurred while updating the meme.",
      error: error.message,
    });
  }
};

//Eliminar meme
export const deleteMeme = async (req, res) => {
  const id = req.params.id;
  try {
    const meme = await memeModel.findByIdAndDelete(id);
    if (!meme) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Meme not found",
      });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Meme deleted successfully",
      deletedMeme: meme,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "An error occurred while deleting the meme",
      error: error.message,
    });
  }
};
