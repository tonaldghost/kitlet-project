exports.up = function(connection) {
  return connection.schema.createTable("categories", categoriesTable => {
    categoriesTable
      .string("slug")
      .primary()
      .unique();
    categoriesTable.string("description");
  });
};

exports.down = function(connection) {
  connection.schema.dropTable("categories");
};
