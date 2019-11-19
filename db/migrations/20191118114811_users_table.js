exports.up = function (connection) {
	return connection.schema.dropTableIfExists('users').createTable('users', (usersTable) => {
		usersTable.string('img');
		usersTable.string('fullname').notNullable();
		usersTable.string('username').unique().primary().notNullable();
	});
};

exports.down = function (connection) {
	return connection.schema.dropTable('users');
};
