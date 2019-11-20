const usersRouter = require('express').Router();
const { getUsers, getUserById, getItemsByUsername } = require('../controllers/usersC');

usersRouter.route('/').get(getUsers);
usersRouter.route('/:username').get(getUserById);
usersRouter.route('/:username/items').get(getItemsByUsername);

module.exports = usersRouter;
