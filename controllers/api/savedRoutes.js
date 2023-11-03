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
router.post('/:id', async (req, res) => {
  const gameId = req.params.game_id;
  const userId = req.user_id;

  try {
    // Create a new saved game object
    const newSavedGame = {
      user_id: userId, // Change user_id if needed
      game_id: parseInt(gameId), // Use the provided game ID
      favorite: false
    };

    const savedGame = await Saved.create(newSavedGame);

    res.status(201).json(savedGame); // Respond with the created saved game
  } catch (err) {
    res.status(500).json({ err: 'Failed to save the game.' });
  }
});


// delete saved game
router.delete('/:id', async (req, res) => {
  try {
    const gameId = req.params.id;

    const deletedGame = await Saved.destroy({
      where: {
        id: gameId,
        game_id_id: req.session.game_id,
      },
    });
    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found in your Saved Collection. Please try again.' });
    }

    res.status(200).json({ message: 'Success! Game removed from Saved Collection!' });
  } catch (err) {
    res.status(500).json({ err: 'Failed to remove the Game from Saved Collection. Please try again.' });
  }
});

module.exports = router;