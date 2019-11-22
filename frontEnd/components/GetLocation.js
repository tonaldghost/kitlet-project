import React from "react";
import { getDistance } from "geolib";

// tony aaron out to solve a problem

// location spike

/*
  when button to sort by location clicked triggers 
  location function component.

  asks for permission first time.

  then must get longitude and latitude of each users location 
  which they declared in their profile. (is this even available 
  on front end through items?) Use set to reduce to single values

  from there it must pass through array of 
  longitudes and latitudes into func similar to below (possibly creating a refObj not as too forget who they belong too)
  -> sort by descending numbers and blam.
*/

import React from "react";

export default function GetLocation() {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      console.log(
        "You are ",
        getDistance(
          position.coords,
          {
            latitude: 51.525,
            longitude: 7.4575
          },
          (accuracy = 1000)
        ),
        "meters away from 51.525, 7.4575"
      );
    },
    () => {
      alert("Position could not be determined.");
    }
  );
  return <div></div>;
}
