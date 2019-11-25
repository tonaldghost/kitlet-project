exports.up = function (connection) {
	return connection.schema.createTable('users', (usersTable) => {
		usersTable.string('img');
		usersTable.string('fullname').notNullable();
		usersTable.string('username').unique().primary().notNullable();
		usersTable.string('location').notNullable();
	});
};

exports.down = function (connection) {
	return connection.schema.dropTable('users');
};
