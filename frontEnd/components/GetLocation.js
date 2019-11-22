import React from "react";
import { Text } from "react-native";
import { getDistance } from "geolib";

export default function GetLocation(props) {
  // brilliant
  const distance = new Promise((resolve, reject) => {
    resolve(
      navigator.geolocation.getCurrentPosition(
        function(position) {
          // console.log(props);
          // random comment
          getDistance(
            position.coords,
            {
              latitude: props.refObjDistance.lat,
              longitude: props.refObjDistance.lng
            },
            (accuracy = 1000)
          );
        },
        err => {
          console.log(err, "error handling");
        }
      )
    );
  });
  distance.then(data => {
    console.log("in promise");
    console.log(data, "promise");
  });
  return <Text>data</Text>;
}
