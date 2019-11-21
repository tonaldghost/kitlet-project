const usersRouter = require('express').Router();
const { getUsers, getUserById, getItemsByUsername } = require('../controllers/usersC');
const { handle405s } = require('../errors/errors');

usersRouter.route('/').get(getUsers).all(handle405s);
usersRouter.route('/:username').get(getUserById).all(handle405s);
usersRouter.route('/:username/items').get(getItemsByUsername).all(handle405s);

module.exports = usersRouter;
