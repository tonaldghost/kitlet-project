const itemsRouter = require('express').Router();
const { getItems, getItemByItemId, addItem } = require('../controllers/itemsC');
const { handle405s } = require('../errors/errors');

itemsRouter.route('/').get(getItems).post(addItem).all(handle405s);
itemsRouter.route('/:item_id').get(getItemByItemId).all(handle405s);

module.exports = itemsRouter;
