import { check, body } from "express-validator";
import { simpsonsNames } from "./simpsonsNames.js";

const simpsonsNamesLowerCase = simpsonsNames.map((name) => name.toLowerCase());
// Validador para la creación de memes
export const validateMemeCreation = [
  check("name", "El nombre es obligatorio").not().isEmpty(),
  body("name")
    .custom((value) => {
      return simpsonsNamesLowerCase.includes(value.toLowerCase());
    })
    .withMessage("El nombre debe ser de un personaje de Los Simpson"),
  check("image", "La URL debe ser válida").isURL(),
];

// Validador para la actualización de memes
export const validateMemeUpdate = [
  check("name", "El nombre es obligatorio").not().isEmpty(),
  body("name")
    .custom((value) => {
      return simpsonsNamesLowerCase.includes(value.toLowerCase());
    })
    .withMessage("El nombre debe ser de un personaje de Los Simpson"),
  check("urlImage", "La URL debe ser válida").isURL({
    protocols: ["http", "https"],
    require_protocol: true,
    require_valid_protocol: true,
  }),
];
