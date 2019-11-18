const { selectItems } = require("../models/itemsM");

getItems = (req, res, next) => {
  selectItems().then(items => {
    res.status(200).send({ items });
  });
};

module.exports = { getItems };
