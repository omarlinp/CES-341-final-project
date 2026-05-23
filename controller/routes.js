const router = require('express').Router();
const model = require('../model');

router.get('/games', model.getGamesData);
router.get('/games/:id', model.getGameById);
router.post('/games', model.createGame);
router.put('/games/:id', model.updateGame);
router.delete('/games/:id', model.deleteGame);

router.get('/users', model.getUsersData);
router.get('/users/:id', model.getUserById);
router.post('/users', model.createUser);
router.put('/users/:id', model.updateUser);
router.delete('/users/:id', model.deleteUser);