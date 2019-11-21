const connection = require('../db/connection');

exports.selectUsers = () => {
	return connection.select('*').from('users');
};

exports.selectUsersById = (username) => {
	return connection.select().from('users').where('users.username', '=', username);
};

exports.selectItemsByUsername = (username) => {
	return connection.select().from('items').where('items.owner', '=', username);
};
