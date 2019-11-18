const apiRouter = require("express").Router();
const itemsRouter = require("../routes/items-router");
const categoriesRouter = require("../routes/categories-router");
const usersRouter = require("../routes/users-router");

apiRouter.use("/items", itemsRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
