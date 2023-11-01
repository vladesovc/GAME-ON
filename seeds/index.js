// const sequelize = require('../config/connection.js');
// const { Users, Games } = require('../models/index.js');

// const userData = require('./userData.json');
// const gameData = require('./gameData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   await Users.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   await Games.bulkCreate(gameData, {
//     individualHooks: true,
//     returning: true,
//   });

//   process.exit(0);
// };

// seedDatabase();

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
