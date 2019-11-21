const categoriesRouter = require('express').Router();
const { getCategories } = require('../controllers/categoriesC');
const { handle405s } = require('../errors/errors');

categoriesRouter.route('/').get(getCategories).all(handle405s);

module.exports = categoriesRouter;
