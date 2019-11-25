const connection = require('../db/connection');

exports.selectItems = (sort_by = 'price', order = 'asc') => {
	let orderDecide = order;
	if (order !== 'asc' && order !== 'desc') {
		orderDecide = 'asc';
	}
	return connection.select('*').from('items').orderBy(sort_by, orderDecide);
};

exports.selectItemById = (item_id) => {
	return connection.select('*').from('items').where('items.item_id', '=', item_id);
};

exports.postItem = (newItem) => {
	return connection('items').insert(newItem).returning('*');
};

exports.patchItemById = (item_id, body) => {
	return connection('items').where('items.item_id', '=', item_id).update(body).returning('*');
};

exports.updateItemRequestStatus = (item_id, inc_req) => {
	return connection('items').where('items.item_id', '=', item_id).increment('requested', inc_req).returning('*');
};
