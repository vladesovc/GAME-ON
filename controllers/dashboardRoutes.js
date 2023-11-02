const router = require('express').Router();
const { Games, Users, Reviews } = require('../models');
const withAuth = require('../utils/auth.js');

// // root/dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await Users.findByPk(req.session.user_id, {
            attributes: { excude: ['password', 'email'] },
            include: [{ model: Games }, { model: Reviews }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...username,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);

    }
});


// router.get('/profile', withAuth, async (req, res) => {
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