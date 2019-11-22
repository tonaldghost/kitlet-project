const messagesRouter = require('express').Router();
const { getMessagesByUsername, getMessageById, getReceivedMessages, addMessage } = require('../controllers/messagesC');
const { handle405s, handle404s } = require('../errors/errors');

messagesRouter.route('/sent/:username').get(getMessagesByUsername).all(handle405s);
messagesRouter.route('/received/:username').get(getReceivedMessages).all(handle405s);
messagesRouter.route('/:message_id').get(getMessageById).all(handle405s);
messagesRouter.route('/').post(addMessage).all(handle405s);
messagesRouter.route('/*').all(handle404s);

module.exports = messagesRouter;
