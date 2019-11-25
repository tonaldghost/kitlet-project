const {
	fetchAllMessages,
	fetchMessagesByUsername,
	fetchReceivedMessages,
	fetchMessageById,
	insertMessage
} = require('../models/messagesM');
const { selectUsersById } = require('../models/usersM');

getAllMessages = (req, res, next) => {
	fetchAllMessages()
		.then((messages) => {
			res.status(200).send({ messages });
		})
		.catch(next);
};

getMessagesByUsername = (req, res, next) => {
	const { username } = req.params;
	selectUsersById(username)
		.then(([ user ]) => {
			if (!user) {
				return Promise.reject({
					msg: '404 custom',
					send: 'User not found',
					status: 404
				});
			} else {
				fetchMessagesByUsername(username).then((messages) => {
					res.status(200).send({ messages });
				});
			}
		})
		.catch(next);
};

getReceivedMessages = (req, res, next) => {
	const { username } = req.params;
	selectUsersById(username)
		.then(([ user ]) => {
			if (!user) {
				return Promise.reject({
					msg: '404 custom',
					send: 'User not found',
					status: 404
				});
			} else {
				fetchReceivedMessages(username).then((messages) => {
					res.status(200).send({ messages });
				});
			}
		})
		.catch(next);
};

getMessageById = (req, res, next) => {
	const { message_id } = req.params;
	fetchMessageById(message_id)
		.then(([ message ]) => {
			if (!message) {
				return Promise.reject({
					msg: '404 custom',
					send: 'Message not found',
					status: 404
				});
			} else {
				res.status(200).send({ message });
			}
		})
		.catch(next);
};

addMessage = (req, res, next) => {
	const { sent_to, sent_from } = req.body;
	const getSender = selectUsersById(sent_from);
	const getReceiver = selectUsersById(sent_to);

	return Promise.all([ getSender, getReceiver ])
		.then((users) => {
			if (!users[0][0] || !users[1][0]) {
				return Promise.reject({
					msg: '404 custom',
					send: 'User not found',
					status: 404
				});
			} else {
				insertMessage(req.body).then((message) => {
					res.status(201).send({ message });
				});
			}
		})
		.catch(next);
};

module.exports = { getAllMessages, getMessagesByUsername, getMessageById, getReceivedMessages, addMessage };
