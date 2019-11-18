const { selectItems, selectItemById, postItem } = require("../models/itemsM");

getItems = (req, res, next) => {
  selectItems().then(items => {
    res.status(200).send({ items });
  });
};

getItemByItemId = (req, res, next) => {
  const { item_id } = req.params;
  selectItemById(item_id)
    .then(([item]) => {
      if (!item) {
        return Promise.reject({
          msg: "404 custom",
          send: "Item not found",
          status: 404
        });
      }
      res.status(200).send({ item });
    })
    .catch(next);
};

// current returns row in which inserted.
// cant use returning
// find way to return previous. knex docs...
addItem = (req, res, next) => {
  postItem(req.body).then(response => {
    console.log(response, "data inserted");
  });
};

module.exports = { getItems, getItemByItemId, addItem };
