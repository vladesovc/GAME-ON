const router = require('express').Router();
const { Games, Users, Reviews, Saved } = require('../models');
const withAuth = require('../utils/auth.js');

// // root/dashboard
router.get('/', withAuth, async (req, res) => {
    console.log('session',req.session);
    try {
        const userData = await Users.findByPk(req.session.user_id, {
            attributes: { exclude: ['password', 'email'] },
            //include: [{ model: Games, through: { model: Saved , as: 'user_choices'} }],
        });
        let gameData = await userData.getUserChoices();
        let games = gameData.map(game => game.get({plain:true}))
        console.log(games);

        const user = userData.get({ plain: true });
        console.log(user);

        res.render('dashboard', {
            ...user,
            ...games,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;