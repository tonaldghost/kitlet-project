const { fetchOwnerRequests, fetchRequesteeRequests } = require('../models/requestsM');

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

module.exports = { getOwnerRequests, getRequesteeRequests };
