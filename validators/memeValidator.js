import { check } from "express-validator";

export const validateMemeCreation = [
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("urlImage", "La URL debe ser válida").isURL(),
];

export const validateMemeUpdate = [
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("urlImage", "La URL debe ser válida").isURL(),
];
