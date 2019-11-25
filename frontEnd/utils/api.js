const axios = require("axios");


export const postNewListing = (
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

export const getAllItems = () => {
  return axios
    .get(`https://be-kitlet.herokuapp.com/api/items`)
    .then(({ data }) => {
      return data;
    });
};
