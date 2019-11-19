const requestsRouter = require('express').Router();
const { getOwnerRequests } = require('../controllers/requestsC');

requestsRouter.route('/').get(getOwnerRequests);

module.exports = requestsRouter;
