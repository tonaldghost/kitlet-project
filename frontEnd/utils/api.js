const axios = require("axios");

exports.getAllItems = () => {
  return axios
    .get(`https://be-kitlet.herokuapp.com/api/items`)
    .then(({ data }) => {
      return data;
    });
};
