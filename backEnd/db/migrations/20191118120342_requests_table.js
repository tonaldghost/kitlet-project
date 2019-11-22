exports.up = function (connection) {
	return connection.schema.createTable('requests', (requestsTable) => {
		requestsTable.increments('request_id').primary();
		requestsTable.string('request_user').references('users.username');
		requestsTable.integer('item_id').references('items.item_id');
		requestsTable.text('body').notNullable();
	});
};

exports.down = function (connection) {
	return connection.schema.dropTable('requests');
};
