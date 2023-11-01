const router = require('express').Router();
const userRoutes = require('./userRoutes');
const savedRoutes = require('./savedRoutes');
const gameRoutes = require('./gameRoutes');


router.use('/users', userRoutes);
router.use('/saved', savedRoutes);
router.use('/games', gameRoutes);

module.exports = router;
