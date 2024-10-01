import { Router } from "express";
import {
  getAllMemes,
  getMemeById,
  createMeme,
  deleteMeme,
  updateMeme,
} from "../controllers/memeControllers.js";
import {
  validateMemeCreation,
  validateMemeUpdate,
} from "../validators/memeValidator.js"; // Importar validaciones
import { validationResult } from "express-validator";

const router = Router();

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Rutas
router.get("/memes", getAllMemes);
router.get("/memes/:id", getMemeById);

// Aplicar validación antes de la creación de un nuevo meme
router.post("/memes", validateMemeCreation, handleValidationErrors, createMeme);

// Aplicar validación antes de actualizar un meme existente
router.put(
  "/memes/:id",
  validateMemeUpdate,
  handleValidationErrors,
  updateMeme
);

router.delete("/memes/:id", deleteMeme);

export default router;
