const requestsRouter = require('express').Router();
const { getOwnerRequests, getRequesteeRequests } = require('../controllers/requestsC');

requestsRouter.route('/incoming').get(getOwnerRequests);
requestsRouter.route('/outgoing').get(getRequesteeRequests);

module.exports = requestsRouter;
