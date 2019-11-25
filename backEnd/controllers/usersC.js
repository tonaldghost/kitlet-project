const { selectUsers, selectUsersById, selectItemsByUsername } = require('../models/usersM');

getUsers = (req, res, next) => {
	selectUsers().then((users) => {
		res.status(200).send({ users });
	});
};

getUserById = (req, res, next) => {
	const { username } = req.params;
	selectUsersById(username)
		.then(([ user ]) => {
			if (!user) {
				return Promise.reject({
					msg: '404 custom',
					send: 'User not found',
					status: 404
				});
			}
			res.status(200).send({ user });
		})
		.catch(next);
};

getItemsByUsername = (req, res, next) => {
	const { username } = req.params;
	selectItemsByUsername(username).then((items) => {
		res.status(200).send({ items });
	});
};

module.exports = { getUsers, getUserById, getItemsByUsername };
