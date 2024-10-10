// Importamos las dependencias necesarias
import mongoose from "mongoose";
import config from "../config.js";

// Desestructuramos las variables de configuración de la base de datos
const { node_env, dev_db_name, test_db_name, host } = config.db;

// Determinamos el nombre de la base de datos según el entorno
const db_name = node_env === "test" ? test_db_name : dev_db_name;

// Imprimimos el entorno actual
console.log(node_env);

// Construimos la URI de conexión a MongoDB
const mongoURI = `mongodb://${host}/${db_name}`;

// Exportamos la conexión a la base de datos
export const connection_db = mongoose.connection;

// Función para inicializar la conexión a la base de datos
export const initializeDatabase = async () => {
  try {
    // Intentamos conectar a MongoDB con las opciones especificadas
    await mongoose.connect(mongoURI);
    
    // Configuramos los eventos de la conexión
    connection_db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
    connection_db.once('open', () => {
      console.log("Conexión a MongoDB establecida correctamente.");
    });
  } catch (error) {
    // Manejamos cualquier error durante la conexión
    console.error("No se pudo conectar a la base de datos:", error);
    throw error;
  }
};
