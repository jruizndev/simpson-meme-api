import { Sequelize } from "sequelize";
import config from "../config.js";

// Extrae las variables de configuración del archivo config.js
const {node_env, dev_db_name, test_db_name, user, password, host, dialect } = config.db;

const db_name = node_env === "test" ? test_db_name : dev_db_name;

console.log(node_env)


export const connection_db = new Sequelize(db_name, user, password, {
  host: host,
  dialect: dialect,
  define: { timestamps: false }, // Evita los timestamps automáticos
});

export const initializeDatabase = async () => {
  try {
    await connection_db.authenticate();
    
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    throw error;
  }
};
