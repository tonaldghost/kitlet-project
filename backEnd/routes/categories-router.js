const categoriesRouter = require("express").Router();
const { getCategories } = require("../controllers/categoriesC");

categoriesRouter.route("/").get(getCategories);

module.exports = categoriesRouter;
