const { Reviews } = require('../models');

const reviewsdata = [
    {
        id: 1,
        user_id: 1,
        game_id: 1,
        text: "I loved it!",
        stars: 5
    }
]

const seedReviews = () => Reviews.bulkCreate(reviewsdata);

module.exports = seedReviews;