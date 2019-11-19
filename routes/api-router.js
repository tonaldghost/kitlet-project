const apiRouter = require('express').Router();
const itemsRouter = require('../routes/items-router');
const categoriesRouter = require('../routes/categories-router');
const usersRouter = require('../routes/users-router');
const requestsRouter = require('../routes/requests-router');

apiRouter.use('/items', itemsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/requests', requestsRouter);

module.exports = apiRouter;
