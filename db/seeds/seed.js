const {
  categoryData,
  itemData,
  requestData,
  usersData
} = require("../data/test-data");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      knex.migrate.latest();
    })
    .then(() => {
      console.log(categoryData);
    });
};
