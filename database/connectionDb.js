import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const connection_db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: { timestamps: false },
  }
);

export const initializeDatabase = async () => {
  try {
    await connection_db.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    throw error;
  }
};

export default connection_db;
