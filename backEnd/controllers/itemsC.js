const { selectItems, selectItemById, postItem, patchItemById } = require('../models/itemsM');

getItems = (req, res, next) => {
	const { sort_by, order } = req.query;
	selectItems(sort_by, order)
		.then((items) => {
			res.status(200).send({ items });
		})
		.catch(next);
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
	if (
		req.body.hasOwnProperty('title', 'owner', 'body', 'category', 'img_url', 'is_available', 'price') &&
		typeof req.body.title === 'string' &&
		typeof req.body.owner === 'string' &&
		typeof req.body.body === 'string' &&
		typeof req.body.category === 'string' &&
		typeof req.body.img_url === 'string' &&
		typeof req.body.is_available === 'boolean' &&
		typeof req.body.price === 'number' &&
		typeof req.body.location === 'string'
	) {
		postItem(req.body)
			.then(([ item ]) => {
				res.status(201).send({ item });
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

editItemById = (req, res, next) => {
	const { item_id } = req.params;
	selectItemById(item_id)
		.then(([ item ]) => {
			if (item.requested === 0) {
				patchItemById(item.item_id, req.body).then(([ item ]) => {
					res.status(202).send({ item });
				});
			} else {
				res.status(401).send({ msg: 'Cannot edit item while item is requested' });
			}
		})
		.catch(next);
};

module.exports = { getItems, getItemByItemId, addItem, editItemById };
