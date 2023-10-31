Const Games = require('./Games.js');
Const Users = require('./Users.js');
Const Saved = require('./Saved.js');

User.hasmany(Games, {
    through: {
        model:
    },
})