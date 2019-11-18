const apiRouter = require("express").Router();
const itemsRouter = require("../routes/items-router");

apiRouter.use("/items", itemsRouter);

module.exports = apiRouter;
