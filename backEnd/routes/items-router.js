const itemsRouter = require('express').Router();
const { getItems, getItemByItemId, addItem, editItemById } = require('../controllers/itemsC');
const { handle405s } = require('../errors/errors');

itemsRouter.route('/').get(getItems).post(addItem).all(handle405s);
itemsRouter.route('/:item_id').get(getItemByItemId).patch(editItemById).all(handle405s);

module.exports = itemsRouter;
