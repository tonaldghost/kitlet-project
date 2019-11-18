const itemsRouter = require("express").Router();
const { getItems, getItemByItemId } = require("../controllers/itemsC");

itemsRouter.route("/").get(getItems);
itemsRouter.route("/:item_id").get(getItemByItemId);

module.exports = itemsRouter;
