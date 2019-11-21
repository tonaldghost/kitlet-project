const {
	fetchOwnerRequests,
	fetchRequesteeRequests,
	insertNewRequest,
	fetchRequestById
} = require('../models/requestsM');

getOwnerRequests = (req, res, next) => {
	const { username } = req.query;
	fetchOwnerRequests(username).then((incoming) => {
		res.status(200).send({ incoming });
	});
};

getRequesteeRequests = (req, res, next) => {
	const { username } = req.query;
	fetchRequesteeRequests(username).then((outgoing) => {
		res.status(200).send({ outgoing });
	});
};

getRequestById = (req, res, next) => {
	const { request_id } = req.params;
	fetchRequestById(request_id).then((request) => {
		res.status(200).send({ request });
	});
};

postNewRequest = (req, res, next) => {
	insertNewRequest(req.body).then(([ newRequestIdx ]) => {
		fetchRequestById(newRequestIdx).then((request) => {
			res.status(201).send({ request });
		});
	});
};

module.exports = { getOwnerRequests, getRequesteeRequests, postNewRequest, getRequestById };
