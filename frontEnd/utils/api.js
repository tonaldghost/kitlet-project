const axios = require("axios");
const baseURL = "https://be-kitlet.herokuapp.com/api";

const fetchUserItems = username => {
  return axios
    .get(`${baseURL}/users/${username}/items`)
    .then(({ data: { items } }) => {
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
    .then(data => {
      return data;
    });
};

const postNewListing = (
  whatItem,
  loggedInUser,
  selectedCat,
  describeItem,
  price,
  fireBaseUrl,
  userLocation
) => {
  return axios
    .post("https://be-kitlet.herokuapp.com/api/items", {
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
  return axios
    .get(`https://be-kitlet.herokuapp.com/api/items`)
    .then(({ data }) => {
      return data;
    });
};

module.exports = {
  getAllItems,
  postNewListing,
  fetchUserItems,
  postNewRequest
};
