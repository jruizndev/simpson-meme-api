// Paso 1: Importación de módulos
import { connection_db } from "../database/connectionDb.js";
import mongoose from "mongoose";

// Paso 2: Definición del esquema
const memeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Paso 3: Creación del modelo
const memeModel = mongoose.model("meme", memeSchema);

// Paso 4: Exportación del modelo
export default memeModel;
