const { Sequelize, Model, DataTypes } = require('sequelize');
const { init } = require('../src/app/App');

const sequelize = new Sequelize('simpson_meme', 'root', 'Madrid2024', {
    host: "localhost",
    dialect: "mysql",
    port: 3306
})

class meme extends Model { }

meme.init({
    meme_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    meme_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
}, {
    sequelize,
    modelName: 'Meme',
});

module.exports = meme;







async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('Todo perfecto')
    } catch (error) {
        console.error('vaya la que has liado', error)
    }
}

testConnection();
































/*import connection_db from '../database/connectionDb.js'
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

export default memeModel*/
