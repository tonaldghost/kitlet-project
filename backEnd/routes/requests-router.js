const requestsRouter = require('express').Router();
const {
	getOwnerRequests,
	getRequesteeRequests,
	postNewRequest,
	getRequestById,
	removeRequestById
} = require('../controllers/requestsC');
const { handle405s } = require('../errors/errors');

requestsRouter.route('/incoming').get(getOwnerRequests).all(handle405s);
requestsRouter.route('/outgoing').get(getRequesteeRequests).all(handle405s);
requestsRouter.route('/').post(postNewRequest).all(handle405s);
requestsRouter.route('/:request_id').get(getRequestById).delete(removeRequestById).all(handle405s);

module.exports = requestsRouter;
