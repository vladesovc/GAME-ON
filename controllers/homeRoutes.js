const router = require('express').Router();
const { Games } = require('../models');
const { Sequelize, DataTypes, Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const allGames = await Games.findAll({
      attributes: ['thumbnail'],
    });
    const gameInfo = allGames.map((game) => game.get({ plain: true }));

    const shuffledGames = shuffleArray(gameInfo);

    const selectedGames = shuffledGames.slice(0, 6);

    const carouselGames = selectedGames.map(obj => obj.thumbnail);
    carouselGames.unshift('https://media.istockphoto.com/id/1320799591/vector/game-on-neon-game-controller-or-joystick-for-game-console-on-blue-background.jpg?s=2048x2048&w=is&k=20&c=oQVZJ94lIx_-awFWha4S-0J0ZnpZ7JEkzflMJlX79vA=');

res.render('homepage', {
  carouselGames,
  logged_in: req.session.logged_in
});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/gamesearch/:id', async (req, res) => {
  try {
      const gameData = await Games.findAll({
          attributes: [
              'title',
              'short_description',
              'thumbnail',
              'game_url',
              'genre',
              'platform',
              'developer',
              [Sequelize.literal('(SELECT AVG(stars) FROM Reviews WHERE Reviews.game_id = Games.id)'), 'average_stars'],
          ],
      });

      const games = gameData.map((game) => game.get({ plain: true }));

      const oneThruFifty = games.slice(0, 50);
      const fiftyOneThruHundred = games.slice(50, 100);
      const hundredOneThruEnd = games.slice(100, 153);
      const arrayId = req.params.id;

      let chosenArray;
      if (arrayId == 1) {
        chosenArray = oneThruFifty;
      } else if (arrayId == 2){
        chosenArray = fiftyOneThruHundred;
      } else {
        chosenArray = hundredOneThruEnd;
      };
      
      res.render('gamesearch', {
          chosenArray,
          logged_in: req.session.logged_in
      });
  } catch (err) {
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