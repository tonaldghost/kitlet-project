const connection = require("../db/connection");

exports.selectItems = () => {
  return connection.select("*").from("items");
};

exports.selectItemById = item_id => {
  return connection
    .select()
    .from("items")
    .where("items.item_id", "=", item_id);
};

exports.postItem = newItem => {
  return connection("items").insert(newItem);
};
