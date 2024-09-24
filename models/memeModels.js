import connection_db from '../database/connectionDb.js'
import { DataTypes } from 'sequelize'

const memeModel = connection_db.define(
    'Characters',
    {
        // Model attributes are defined here
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
