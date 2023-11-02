const Games = require('./Games.js');
const Users = require('./Users.js');
const Saved = require('./Saved.js');
const Reviews = require('./Reviews.js');

Users.belongsToMany(Games, {
    through: {
        model: Saved,
        unique: false,
    },
    as: 'user_choices'
});

Games.belongsToMany(Users, {
    through: {
        model: Saved,
        unique: false,
    },
    as: 'saved_games'
});

Users.belongsToMany(Games, {
    through: {
        model: Reviews,
        unique: false,
    },
    as: 'user_reviews'
});

Games.belongsToMany(Users, {
    through: {
        model: Reviews,
        unique: false,
    },
    as: 'reviewed_games'
});



module.exports = {
    Games,
    Users,
    Saved,
    Reviews
};
