const sequelize = require('../config/connection.js');
const { Users, Games } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const games = await Games.bulkCreate(gameData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
