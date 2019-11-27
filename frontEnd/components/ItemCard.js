import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import mainGreen from "../constants/Colors";
import mainRed from "../constants/Colors";
import GetLocation from "../components/GetLocation";
import { getDistance } from "geolib";

const ItemCard = ({ props, refObjDistance }) => {
  async function distanceKm(myPosLat, myPosLng, distLat, distLng) {
    const distance = await getDistance(
      { latitude: myPosLat, longitude: myPosLng },
      { latitude: distLat, longitude: distLng }
    );
    console.log(Math.round(distance / 1000));
    return Math.round(distance / 1000);
  }
  return (
    <View style={styles.itemCardContainer}>
      <Image style={styles.itemCardImage} source={{ uri: props.img_url }} />
      <View style={styles.innerContent}>
        {props.is_available ? (
          <Text style={styles.fixedIsAvailable}>Available</Text>
        ) : (
          <Text style={styles.fixedIsNotAvailable}>Not Available</Text>
        )}

        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.location}>{props.location}</Text>
        {typeof refObjDistance === "object" &&
          navigator.geolocation.getCurrentPosition(position => {
            let myPosLat = position.coords.latitude;
            let myPosLng = position.coords.longitude;
            let distLat = refObjDistance.lat;
            let distLng = refObjDistance.lng;
            distanceKm(myPosLat, myPosLng, distLat, distLng);
          })}
        <Text style={styles.price}>
          £{props.price}
          <Text style={styles.perDay}>/day</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 22 },
  itemCardContainer: {
    display: "flex",
    minHeight: 128,
    marginLeft: 16,
    marginRight: 16,
    width: "auto",
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderColor: "#eee",
    borderWidth: 1
  },
  fixedIsAvailable: {
    position: "absolute",
    top: -32,
    right: 12,
    color: mainGreen.mainGreen,
    padding: 10
  },
  fixedIsNotAvailable: {
    position: "absolute",
    top: -32,
    right: 12,
    color: mainRed.mainRed,
    padding: 10
  },
  innerContent: { flex: 2, paddingLeft: 16 },
  itemCardImage: { flex: 1, width: 64, height: 128, margin: "auto" },
  price: {
    fontWeight: "800",
    color: mainGreen.mainGreen
  },
  perDay: {
    fontWeight: "400",
    color: "black"
  }
});

export default ItemCard;
