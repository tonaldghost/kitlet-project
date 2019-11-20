const requestsRouter = require('express').Router();
const { getOwnerRequests, getRequesteeRequests, postNewRequest, getRequestById } = require('../controllers/requestsC');

requestsRouter.route('/incoming').get(getOwnerRequests);
requestsRouter.route('/outgoing').get(getRequesteeRequests);
requestsRouter.route('/').post(postNewRequest);
requestsRouter.route('/:request_id').get(getRequestById);

module.exports = requestsRouter;
