// const { Model, dataTypes } = require('sequelize')
// const sequilize = require('../config/connection.js');

class User extends Model {}

    User.init(
        {
            id: {
                type: DataType.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            user_name: {
                type: DataType.string,
                allowNull: false,
                unique: true,


            }
        }
    )
