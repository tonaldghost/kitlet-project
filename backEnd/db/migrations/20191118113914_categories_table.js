exports.up = function (connection) {
	return connection.schema.createTable('categories', (categoriesTable) => {
		categoriesTable.string('slug').primary();
		categoriesTable.string('description').notNullable();
	});
};

exports.down = function (connection) {
	return connection.schema.dropTable('categories');
};
