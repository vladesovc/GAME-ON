const router = require('express').Router();
const { Games, Users, Reviews } = require('../models');
const withAuth = require('../utils/auth.js');

// // root/dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await Users.findByPk(req.session.user_id, {
            attributes: { exclude: ['password', 'email'] },
            include: [{ model: Games, through: { model: Saved }, as: 'saved_games' }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// router.get('/', withAuth, async (req, res) => {
//     try {
//       // Find the logged in user based on the session ID
//       const userData = await User.findByPk(req.session.user_id, {
//         attributes: { exclude: ['password'] },
//         include: [{ model: Project }],
//       });
  
//       const user = userData.get({ plain: true });
  
//       res.render('profile', {
//         ...user,
//         logged_in: true
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });


module.exports = router;