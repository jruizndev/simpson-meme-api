import connection_db from "../database/connectionDb.js";
import { DataTypes } from "sequelize";

const memeModel = connection_db.define(
  "Characters",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // autoincremental
      primaryKey: true, // clave primaria
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default memeModel;
