const { selectUsers, selectUsersById } = require("../models/usersM");

getUsers = (req, res, next) => {
  selectUsers().then(users => {
    res.status(200).send({ users });
  });
};

getUserById = (req, res, next) => {
  const { username } = req.params;
  selectUsersById(username).then(([user]) => {
    res.status(200).send({ user });
  });
};

module.exports = { getUsers, getUserById };
