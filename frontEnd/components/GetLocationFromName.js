const ApiKeys = require("../constants/ApiKeys");

// exports.getLocationFromName = singleLocations => {
//   const key = ApiKeys.default.MapsApiGeoCode.key;
//   const refObjDistance = {};
//   console.log(singleLocations);

//   return fetch(
//     `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`
//   )
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       return data.results[0].geometry.location;
//     });
// };

async function getLocationFromName(singleLocations) {
  const promiseArr = Array.from(singleLocations).map(
    location =>
      new Promise((resolve, reject) => {
        resolve(apiCall(location));
      })
  );

  const refObjDistance = {};
  return await Promise.all(promiseArr)
    .then(data => {
      Array.from(singleLocations).map((location, idx) => {
        refObjDistance[location] = data[idx];
      });
    })
    .then(() => {
      return refObjDistance;
    });
}

function apiCall(location) {
  const key = ApiKeys.default.MapsApiGeoCode.key;
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.results[0].geometry.location;
    });
}

module.exports = { getLocationFromName };
