const { selectItems, selectItemById, postItem, selectItemsByUsername } = require('../models/itemsM');

getItems = (req, res, next) => {
	selectItems().then((items) => {
		res.status(200).send({ items });
	});
};

getItemByItemId = (req, res, next) => {
	const { item_id } = req.params;
	selectItemById(item_id)
		.then(([ item ]) => {
			if (!item) {
				return Promise.reject({
					msg: '404 custom',
					send: 'Item not found',
					status: 404
				});
			}
			res.status(200).send({ item });
		})
		.catch(next);
};

addItem = (req, res, next) => {
	if (req.body.hasOwnProperty('owner', 'body', 'category', 'img_url', 'is_available', 'price')) {
		postItem(req.body)
			.then(([ newItemIdx ]) => {
				selectItemById(newItemIdx.toString()).then(([ item ]) => {
					res.status(201).send({ item });
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

module.exports = { getItems, getItemByItemId, addItem };
