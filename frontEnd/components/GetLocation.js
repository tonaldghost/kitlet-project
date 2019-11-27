import React from "react";
import { Text } from "react-native";
import { getDistance } from "geolib";

export default function GetLocation(props) {
  doIt = navigator.geolocation.getCurrentPosition(
    function(position) {
      getDistance(
        position.coords,
        {
          latitude: props.refObjDistance.lat,
          longitude: props.refObjDistance.lng
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
