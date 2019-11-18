const itemsRouter = require("express").Router();
const { getItems } = require("../controllers/itemsC");

itemsRouter.route("/").get(getItems);

module.exports = itemsRouter;
