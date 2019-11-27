const axios = require('axios');
const baseURL = 'https://be-kitlet.herokuapp.com/api';

const fetchUserItems = (username) => {
	return axios.get(`${baseURL}/users/${username}/items`).then(({ data: { items } }) => {
		return items;
	});
};

const postNewRequest = (item_id, body, request_user) => {
	return axios
		.post(`${baseURL}/requests`, {
			item_id,
			body,
			request_user
		})
		.then((data) => {
			return data;
		});
};

const postNewListing = (whatItem, loggedInUser, selectedCat, describeItem, price, fireBaseUrl, userLocation) => {
	return axios
		.post('https://be-kitlet.herokuapp.com/api/items', {
			is_available: true,
			title: whatItem,
			owner: loggedInUser,
			category: selectedCat,
			body: describeItem,
			price: +price,
			img_url: fireBaseUrl,
			location: userLocation
		})
		.then(({ data: { item } }) => {
			return item;
		});
};

const getAllItems = () => {
	return axios.get(`https://be-kitlet.herokuapp.com/api/items`).then(({ data }) => {
		return data;
	});
};

const getAreaCoordinates = (location, apiKey) => {
	return axios
		.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${location}&key=${apiKey}`)
		.then((response) => {
			return response;
		});
};

const getIncoming = (username) => {
	return axios
		.get(`https://be-kitlet.herokuapp.com/api/requests/incoming?username=${username}`)
		.then(({ data: { incoming } }) => {
			return incoming;
		});
};

const getOutgoing = (username) => {
	return axios
		.get(`https://be-kitlet.herokuapp.com/api/requests/outgoing?username=${username}`)
		.then(({ data: { outgoing } }) => {
			return outgoing;
		});
};

const getIncomingMessages = (username) => {
	return axios
		.get(`https://be-kitlet.herokuapp.com/api/messages/received/${username}`)
		.then(({ data: { messages } }) => {
			return messages;
		});
};

const getSentMessages = (username) => {
	return axios.get(`https://be-kitlet.herokuapp.com/api/messages/sent/${username}`).then(({ data: { messages } }) => {
		return messages;
	});
};

module.exports = {
	getAllItems,
	postNewListing,
	fetchUserItems,
	getIncoming,
	getOutgoing,
	getAreaCoordinates,
	postNewRequest,
	getIncomingMessages,
	getSentMessages
};
