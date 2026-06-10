const router = require('express').Router();
const model = require('../model');
const validator = require('../middleware/validator');

router.get('/games', model.getGamesData);
router.get('/games/:id', model.getGameById);
router.post('/games', validator.validateGame, model.createGame);
router.put('/games/:id', validator.validateGame, model.updateGame);
router.delete('/games/:id', model.deleteGame);

router.get('/users', model.getUsersData);
router.get('/users/:id', model.getUserById);
router.post('/users', validator.validateUser, model.createUser);
router.put('/users/:id', validator.validateUser, model.updateUser);
router.delete('/users/:id', model.deleteUser);

router.get('/', (req, res) => {
    res.send('Welcome to the Game API');
});
module.exports = router;