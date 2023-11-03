const router = require('express').Router();
const { Games, Users, Reviews } = require('../../models');

// root/api/games/:id
router.get('/:id', async (req, res) => {
    try {
        const gameData = await Games.findByPk(req.params.id, {
            include: [{ model: Users }, { model: Reviews }],
        });

        const game = gameData.get({ plain: true });

        res.render('games', {
            ...game,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Search by title - root/api/games/titlesearch/:title
router.get('/titlesearch/:title', async (req, res) => {
    try {
      const getByTitle = await Games.findAll({
        where: {
          title: req.params.title,
        }
      })
      res.status(200).json(getByTitle);
    //   res.render('title-search-results', {
    //     getByTitle
    //   })
    } catch (err) {
      res.status(500).json(err);
  }
  });
  
  // // Search by genre - root/api/games/genresearch
  // router.get('/genresearch', async (req, res) => {
  //   try {
  
  //     res.status(200).json();
  //   } catch (err) {
  //     res.status(500).json(err);
  // }
  // });

module.exports = router;

