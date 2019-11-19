const connection = require("../db/connection");

exports.selectUsers = () => {
  return connection.select("*").from("users");
};

exports.selectUsersById = username => {
  return connection
    .select()
    .from("users")
    .where("users.username", "=", username);
};
