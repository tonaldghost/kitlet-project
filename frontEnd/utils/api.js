const axios = require('axios');
const baseURL = 'https://be-kitlet.herokuapp.com/api';

export const fetchUserItems = (username) => {
	return axios.get(`${baseURL}/users/${username}/items`).then(({ data: { items } }) => {
		return items;
	});
};
