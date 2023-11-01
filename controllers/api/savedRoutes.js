const express = require('express');
const router = express.Router();
const { Saved } = require('../../models'); 
const withAuth = require('../../utils/auth.js');

// gets all saved data
router.get('/saved', async (req, res) => {
    try {
      const savedItems = await Saved.findAll();
      
      const savedData = savedItems.map((saved) => saved.get({ plain: true }));
      
      res.render('Saved', {
        savedItems: savedData,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  // create a new saved item
  router.post('/saved', withAuth, async (req, res) => {
    try {
      const newSavedGame = await Saved.create(req.body);
      // Redirect to the route that displays the saved games, passing the newly saved game's ID in the URL
      res.redirect(`/saved/${newSavedGame.id}`);
    } catch (err) {
      res.status(400).json({ err: 'Could not find Game by ID. Please ensure info is correct.'});
    }
  });

  // render the newly saved game
  router.get('/saved/:id', withAuth, async (req, res) => {
    try {
      const savedGame = await Saved.findByPk(req.params.id);
      if (!savedGame) {
        return res.status(404).json({ message: 'Fail: Saved game not found' });
      }
      // Render a view displaying the saved game
      res.render('SavedItem', { savedItem });
    } catch (err) {
      res.status(500).json({ message: 'Failed. Please try again.' });
    }
  });

  // delete saved item
  router.delete('/saved/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Saved.destroy({
        where: { id }
      });
      if (deleted) {
        res.json({ message: 'Game removed from Favorites' });
      } else {
        res.status(404).json({ message: 'Game not found in Favorites' });
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  module.exports = router;