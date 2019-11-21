const usersRouter = require('express').Router();
const { getUsers, getUserById, getItemsByUsername } = require('../controllers/usersC');
const { handle405s, handle404s } = require('../errors/errors');

usersRouter.route('/').get(getUsers).all(handle405s);
usersRouter.route('/:username').get(getUserById).all(handle405s);
usersRouter.route('/:username/items').get(getItemsByUsername).all(handle405s);
usersRouter.route('/*').all(handle404s);

module.exports = usersRouter;
