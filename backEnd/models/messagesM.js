const connection = require('../db/connection');

exports.fetchAllMessages = () => {
	return connection('messages').select('*');
};

exports.fetchMessagesByUsername = (username) => {
	return connection('messages').select('*').where('messages.sent_from', '=', username);
};

exports.fetchReceivedMessages = (username) => {
	return connection('messages').select('*').where('messages.sent_to', '=', username);
};

exports.fetchMessageById = (message_id) => {
	return connection('messages').select('*').where('messages.message_id', '=', message_id);
};

exports.insertMessage = (message) => {
	return connection('messages').insert(message).returning('*');
};
