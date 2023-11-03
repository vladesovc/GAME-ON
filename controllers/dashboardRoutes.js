const router = require('express').Router();
const { Games, Users, Reviews, Saved } = require('../models');
const withAuth = require('../utils/auth.js');

// // root/dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await Users.findByPk(req.session.user_id, {
            attributes: { exclude: ['password', 'email'] },
            // include: [{ model: Games, 
            //     through: { model: Saved, 
            //         as: 'user_choices' }  }],
        });
console.log(userData)
// res.status(200).json(userData)
        const user = userData.map((dash) => dash.get({ plain: true }));
//         console.log(user)
// res.status(200).json(user)
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;