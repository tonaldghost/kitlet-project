const itemsRouter = require('express').Router();
const { getItems, getItemByItemId, addItem } = require('../controllers/itemsC');

itemsRouter.route('/').get(getItems).post(addItem);
itemsRouter.route('/:item_id').get(getItemByItemId);

module.exports = itemsRouter;
