const apiRouter = require('express').Router();
const itemsRouter = require('./items-router');
const categoriesRouter = require('./categories-router');
const usersRouter = require('./users-router');
const requestsRouter = require('./requests-router');

apiRouter.use('/items', itemsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/requests', requestsRouter);

module.exports = apiRouter;
