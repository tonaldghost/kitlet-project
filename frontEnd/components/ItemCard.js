import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import mainGreen from "../constants/Colors";
import mainRed from "../constants/Colors";
import { getDistance } from "geolib";

class ItemCard extends React.Component {
  state = {
    hasObj: false,
    refObj: {}
  };
  componentDidMount() {
    const refObj = this.props.refObjDistance;
    refObj && this.setState({ hasObj: true });
  }

  distanceKm(myPosLat, myPosLng, distLat, distLng) {
    const distance = getDistance(
      { latitude: myPosLat, longitude: myPosLng },
      { latitude: distLat, longitude: distLng }
    );
    this.setState({ distanceAway: Math.round(distance / 1000) });
  }

  render() {
    return (
      <View style={styles.itemCardContainer}>
        <Image
          style={styles.itemCardImage}
          source={{ uri: this.props.props.img_url }}
        />
        <View style={styles.innerContent}>
          {this.props.props.is_available ? (
            <Text style={styles.fixedIsAvailable}>Available</Text>
          ) : (
            <Text style={styles.fixedIsNotAvailable}>Not Available</Text>
          )}

          <Text style={styles.title}>{this.props.props.title}</Text>
          <Text style={styles.location}>{this.props.props.location}</Text>
          {this.state.hasObj &&
            navigator.geolocation.getCurrentPosition(position => {
              let myPosLat = position.coords.latitude;
              let myPosLng = position.coords.longitude;
              let distLat = this.props.refObjDistance.lat;
              let distLng = this.props.refObjDistance.lng;

              this.distanceKm(myPosLat, myPosLng, distLat, distLng);
            })}
          {this.state.distanceAway && (
            <Text>{this.state.distanceAway + "km away"}</Text>
          )}
          <Text style={styles.price}>
            £{this.props.props.price}
            <Text style={styles.perDay}>/day</Text>
          </Text>
        </View>
      </View>
    );
  }
}

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
