const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Saved extends Model {
  checkPassword(loginPw) {}
}

Saved.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    game_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'games',
        key: 'id',
      },
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Saved',
  }
);

module.exports = Saved;
module.exports = Saved;
