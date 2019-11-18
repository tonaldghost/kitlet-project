const { selectItems, selectItemById } = require("../models/itemsM");

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

module.exports = { getItems, getItemByItemId };
