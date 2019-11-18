exports.up = function(connection) {
  return connection.schema.createTable("users", usersTable => {
    usersTable.string("img");
    usersTable.string("name").notNullable();
    usersTable
      .string("username")
      .unique()
      .primary()
      .notNullable();
  });
};

exports.down = function(connection) {
  connection.schema.dropTable("users");
};
