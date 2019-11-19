const connection = require('../db/connection');

exports.fetchOwnerRequests = (username) => {
	return connection
		.from('requests')
		.innerJoin('items', 'requests.item_id', 'items.item_id')
		.where('items.owner', '=', username);
};
