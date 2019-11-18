exports.up = function(connection) {
  return connection.schema.createTable("items", itemsTable => {
    itemsTable.increments("item_id").primary();
    itemsTable.string("owner").references("users.username");
    itemsTable.string("category").references("categories.slug");
    itemsTable.text("body").notNullable();
    itemsTable.string("img_url").notNullable();
    itemsTable.boolean("is_available").notNullable();
  });
};

exports.down = function(connection) {
  connection.schema.dropTable("items");
};
