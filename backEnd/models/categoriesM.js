const connection = require("../db/connection");

exports.selectCategories = () => {
  return connection.select("*").from("categories");
};
