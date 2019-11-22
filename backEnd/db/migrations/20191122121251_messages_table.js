exports.up = function (connection) {
	return connection.schema.createTable('messages', (messagesTable) => {
		messagesTable.increments('message_id').primary();
		messagesTable.string('title').defaultsTo('');
		messagesTable.text('body').notNullable();
		messagesTable.string('sent_from').references('users.username');
		messagesTable.string('sent_to').references('users.username');
		messagesTable.timestamp('created_at').defaultsTo(connection.fn.now());
	});
};

exports.down = function (connection) {
	return connection.schema.dropTable('messages');
};
