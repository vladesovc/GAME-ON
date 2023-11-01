const sequelize = require('../config/connection');
const seedUsers = require('./UsersData');
const seedGames = require('./GamesData.js');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedGames();

  process.exit(0);
};

seedAll();
