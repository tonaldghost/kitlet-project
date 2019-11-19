const { selectCategories } = require("../models/categoriesM");

getCategories = (req, res, next) => {
  selectCategories().then(categories => {
    res.status(200).send({ categories });
  });
};

module.exports = { getCategories };
