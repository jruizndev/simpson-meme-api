// config.js
import dotenv from 'dotenv';
dotenv.config();
const config = {
  db: {
    // Utilizamos las variables de entorno para configurar la base de datos
    name: process.env.DB_NAME, // Nombre de la base de datos desde variable de entorno
    user: process.env.DB_USER, // Usuario de la base de datos desde variable de entorno
    password: process.env.DB_PASSWORD, // Contraseña de MySQL desde variable de entorno
    host: process.env.DB_HOST || "localhost", // Host desde variable de entorno, con valor por defecto
    dialect: process.env.DB_DIALECT || "mysql", // Dialecto desde variable de entorno, con valor por defecto
  },
};

export default config;
