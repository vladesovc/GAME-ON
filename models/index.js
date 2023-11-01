const Games = require('./Games.js');
const Users = require('./Users.js');
const Saved = require('./Saved.js');

Users.hasmany(Games, {
    through: {
        model: Saved,
        unique: false,
    },
    as: 'user_choices',
});

Games.hasmany(Users, {
    through: {
        model: Saved,
        unique: false,
    },
    as: 'saved_games',
});

module.exports = {
    Games,
    Users,
    Saved
};