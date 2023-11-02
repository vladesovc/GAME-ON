const router = require('express').Router();
const { Games, Users, Saved, Reviews } = require('../models');
// const sequelize = require('../config/connection.js');
const { Sequelize, DataTypes, Op } = require('sequelize'); // Import Op for aggregation functions

router.get('/', async (req, res) => {
  try {
    const allGames = await Games.findAll({
      attributes: [
        'thumbnail'
        // [Sequelize.literal('(SELECT AVG(stars) FROM Reviews WHERE Reviews.game_id = Games.id)'), 'average_stars'],
      ],
    });
    const gameInfo = allGames.map((game) => game.get({ plain: true }));

    const shuffledGames = shuffleArray(gameInfo);

    const carouselGames = shuffledGames.slice(0, 5);


res.render('homepage', {
  ...carouselGames,
  logged_in: req.session.logged_in
});
    // res.status(200).json(carouselGames);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render login/signup page  
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

//Fisher Yates shuffle algorithm (via Stack Overflow)
function shuffleArray(array){
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};


module.exports = router;