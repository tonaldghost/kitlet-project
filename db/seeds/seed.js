const { categoryData, itemData, requestData, usersData } = require('../data/test-data');

exports.seed = function (knex) {
	return knex.migrate
		.rollback()
		.then(() => knex.migrate.latest())
		.then(() => {
			const categoryInsert = knex.insert(categoryData).into('categories');
			const usersInsert = knex.insert(usersData).into('users');
			return Promise.all([ categoryInsert, usersInsert ]);
		})
		.then(() => {
			return knex.insert(itemData).into('items');
		})
		.then(() => {
			return knex.insert(requestData).into('requests');
		});
};
