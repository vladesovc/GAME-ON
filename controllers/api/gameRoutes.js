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

module.exports = router;

