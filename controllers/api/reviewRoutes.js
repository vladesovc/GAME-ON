const express = require('express');
const router = express.Router();
const { Reviews } = require('../../models'); 
const withAuth = require('../../utils/auth.js');

// POST route to create a new review, using Auth to check if the user is logged in
router.post('/reviews', withAuth, async (req, res) => {
    try {
    const { user_id, game_id, text, stars } = req.body;

        // Create a new review
        const newReview = await Review.create({
          user_id,
          game_id,
          text,
          stars
        });
        
        res.status(201).json({ Reviews: newReview, message: 'Success! Review has been posted!' });
    } catch (err) {
      res.status(500).json({ err: 'https://http.dog/500.json' });
    }
  });

// DELETE route to delete a review by ID
router.delete('/reviews/:id', withAuth, async (req, res) => {
  try {
    const reviewToDelete = await Reviews.destroy({
    where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!reviewToDelete) {
      return res.status(404).json({ message: 'Cannot find Review. Please Try Again.' });
    }
    res.status(200).json({ message: 'Success! Review deleted!' });
  } catch (err) {
    res.status(500).json({ err: 'Failed to delete the review. Please try again.' });
  }
});

module.exports = router;