const router = require('express').Router();
const { Games, Users } = require('../../models');
// const withAuth = require('../utils/auth');

// root/api/games - Get all games
router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const gameData = await Games.findAll({
            include: [{ model: Users }]
        });

        // Serialize data so the template can read it
        const games = gameData.map((game) => game.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('Games', {
            games,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// root/api/games/:id
router.get('/:id', async (req, res) => {
    try {
        const gameData = await Games.findByPk(req.params.id, {
            include: [{ model: Users }],
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

module.exports = router;