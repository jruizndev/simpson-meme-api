import { check } from "express-validator";

// Validaciones para la creación de un meme
export const validateMemeCreation = [
  check("name", "El nombre es obligatorio").not().isEmpty(), // Verifica que 'name' no esté vacío
  check("image", "La URL debe ser válida").isURL(), // Verifica que 'urlImage' sea una URL válida
];

// Validaciones para la actualización de un meme
export const validateMemeUpdate = [
  check("name", "El nombre es obligatorio").not().isEmpty(), // Verifica que 'name' no esté vacío
  check("image", "La URL debe ser válida").isURL(), // Verifica que 'urlImage' sea una URL válida
];
