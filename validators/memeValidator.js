import { check, body } from "express-validator";
import { simpsonsNames } from "./simpsonsNames.js";

const simpsonsNamesLowerCase = simpsonsNames.map((name) => name.toLowerCase());
// Validador para la creación de memes
export const validateMemeCreation = [
  check("name", "El nombre es obligatorio").not().isEmpty(), // Verifica que 'name' no esté vacío
  check("image", "La URL debe ser válida").isURL(), // Verifica que 'urlImage' sea una URL válida
];

// Validador para la actualización de memes
export const validateMemeUpdate = [
  check("name", "El nombre es obligatorio").not().isEmpty(), // Verifica que 'name' no esté vacío
  check("image", "La URL debe ser válida").isURL(), // Verifica que 'urlImage' sea una URL válida
];
