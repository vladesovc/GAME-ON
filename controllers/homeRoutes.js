const router = require('express').Router();

// Render login/signup page  
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
    res.render('login');
});

module.exports = router;