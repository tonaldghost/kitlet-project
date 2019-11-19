const { fetchOwnerRequests } = require('../models/requestsM');

getOwnerRequests = (req, res, next) => {
	const { username } = req.query;

	fetchOwnerRequests(username).then((requests) => {
		res.status(200).send({ requests });
	});
};

module.exports = { getOwnerRequests };
