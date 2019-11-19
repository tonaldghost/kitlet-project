const usersRouter = require("express").Router();
const { getUsers, getUserById } = require("../controllers/usersC");

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUserById);

module.exports = usersRouter;
