const router = require('express').Router();
const { Games, Users, Reviews } = require('../models');

//Render homepage
router.get('/', async (req, res) => {
  try {
//     // Get all projects and JOIN with user data
//     const allGames = await Games.findAll({
//       include: [{
//         model: Reviews,
//         attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'averageValue'],]
//       }],
//     });

//     const calculateAverage = async () => {
//       try {
//         const result = await Reviews.findAll({
//           attributes: [
//             [sequelize.fn('AVG', sequelize.col('stars')), 'averageValue'],
//           ],
//         });

//         const averageValue = result[0].dataValues.averageValue;
//         console.log('Rating:', averageValue);
//         calculateAverage();

//       } catch (error) {
//         console.error('Error calculating average:', error);
//       }
//     };
//     const shuffledGames = shuffleArray(allGames);

//     const carouselGames = shuffledGames.slice(6);
    
// // Serialize data so the template can read it
// const games = carouselGames.map((game) => game.get({ plain: true }));

// Pass serialized data and session flag into template
res.render('homepage', {
  // ...games,
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

//Fisher Yates shuffle algorithm 
function shuffleArray(arr){
  for(i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random()*(i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

module.exports = router;