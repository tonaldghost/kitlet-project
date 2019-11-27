import React from "react";
import { Text } from "react-native";
import { getDistance } from "geolib";

export default function GetLocation({ refObjDistance }) {
  console.log(refObjDistance.lat);
  console.log(refObjDistance.lng);
  getDistanceFromCo = navigator.geolocation.getCurrentPosition(
    function(position) {
      getDistance(
        position.coords,
        {
          latitude: refObjDistance.lat,
          longitude: refObjDistance.lng
        },
        (accuracy = 1000)
      );
    },
    () => {
      alert("Location could not be determined...");
    }
  );

  return <Text>{this.doIt}</Text>;
}
