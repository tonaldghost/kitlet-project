const {
	fetchOwnerRequests,
	fetchRequesteeRequests,
	insertNewRequest,
	fetchRequestById
} = require('../models/requestsM');

getOwnerRequests = (req, res, next) => {
	const { username } = req.query;
	fetchOwnerRequests(username)
		.then((incoming) => {
			res.status(200).send({ incoming });
		})
		.catch(next);
};

getRequesteeRequests = (req, res, next) => {
	const { username } = req.query;
	fetchRequesteeRequests(username)
		.then((outgoing) => {
			res.status(200).send({ outgoing });
		})
		.catch(next);
};

getRequestById = (req, res, next) => {
	const { request_id } = req.params;
	fetchRequestById(request_id)
		.then((request) => {
			if (request.length === 0) {
				return Promise.reject({
					msg: '404 custom',
					send: 'Request not found',
					status: 404
				});
			} else {
				res.status(200).send({ request });
			}
		})
		.catch(next);
};

postNewRequest = (req, res, next) => {
	if (
		req.body.hasOwnProperty('request_user', 'item_id', 'body') &&
		typeof req.body.request_user === 'string' &&
		typeof req.body.item_id === 'number' &&
		typeof req.body.body === 'string'
	) {
		insertNewRequest(req.body)
			.then(([ newRequestIdx ]) => {
				fetchRequestById(newRequestIdx).then((request) => {
					res.status(201).send({ request });
				});
			})
			.catch(next);
	} else {
		next({
			msg: '400 bad request',
			send: 'Invalid request',
			status: 400
		});
	}
};

module.exports = { getOwnerRequests, getRequesteeRequests, postNewRequest, getRequestById };
