exports.up = function(connection) {
  return connection.schema.createTable("requests", requestsTable => {
    requestsTable.string("kit_owner").references("users.username");
    requestsTable.string("request_user").references("users.username");
    requestsTable.text("body").notNullable();
  });
};

exports.down = function(connection) {
  connection.schema.dropTable("requests");
};
