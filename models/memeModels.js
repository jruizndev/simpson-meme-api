import connection_db from '../database/connectionDb.js'
import { DataTypes } from 'sequelize'

const memeModel = connection_db.define(
    'Characters',
    {
        meme_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
)

export default memeModel
