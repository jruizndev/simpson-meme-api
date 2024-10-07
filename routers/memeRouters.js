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
} from "../validators/memeValidator.js";
import { validationResult } from "express-validator";

const router = Router();

router.get("/memes", getAllMemes);
router.get("/memes/:id", getMemeById);

// Crear un meme con validación
router.post("/memes", validateMemeCreation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  createMeme(req, res);
});

router.put("/memes/:id", validateMemeUpdate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  updateMeme(req, res);
});

router.delete("/memes/:id", deleteMeme);

export default router;
