const connection = require('../db/connection');

exports.fetchOwnerRequests = (username) => {
	return connection
		.from('requests')
		.innerJoin('items', 'requests.item_id', 'items.item_id')
		.where('items.owner', '=', username);
};

exports.fetchRequesteeRequests = (username) => {
	return connection
		.from('requests')
		.innerJoin('items', 'requests.item_id', 'items.item_id')
		.where('requests.request_user', '=', username);
};

exports.insertNewRequest = (request) => {
	return connection('requests').insert(request);
};

exports.fetchRequestById = (request_id) => {
	return connection('requests').select().where('requests.request_id', '=', request_id);
};
