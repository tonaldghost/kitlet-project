const connection = require("../db/connection");

exports.selectItems = (req, res, next) => {
  return connection.select("*").from("items");
};
