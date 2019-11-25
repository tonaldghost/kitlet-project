import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import mainGreen from "../constants/Colors";
import mainRed from "../constants/Colors";
import tintColor from "../constants/Colors";

const RequestCard = ({ item, showIncoming }) => {
  return (
    <View style={styles.RequestCardContainer}>
      <Image style={styles.RequestCardImage} source={{ uri: item.img_url }} />
      <View style={styles.innerContent}>
        {item.is_available ? (
          <Text style={styles.fixedIsAvailable}>Available</Text>
        ) : (
          <Text style={styles.fixedIsNotAvailable}>Not Available</Text>
        )}
        {showIncoming ? (
          <Text style={styles.title}>REQUESTED</Text>
        ) : (
          <Text style={styles.youRequested}>YOU REQUESTED</Text>
        )}
        {showIncoming ? (
          <Text style={styles.title}>{item.title}</Text>
        ) : (
          <Text style={styles.youRequested}>{item.title}</Text>
        )}
        {showIncoming ? (
          <Text style={styles.owner}>Requested by: {item.request_user}</Text>
        ) : (
          <Text style={styles.owner}>From: {item.owner}</Text>
        )}
        {!showIncoming && (
          <Text style={styles.location}>In: {item.location}</Text>
        )}
        <Text style={styles.price}>
          £{item.price}
          <Text style={styles.perDay}>/day</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 22, color: mainRed.mainRed, fontWeight: "600" },
  owner: { fontSize: 16 },
  RequestCardContainer: {
    display: "flex",
    minHeight: 160,
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
  RequestCardImage: {
    flex: 1,
    width: 64,
    height: 64,
    margin: "auto"
  },
  price: {
    fontWeight: "800",
    color: mainGreen.mainGreen
  },
  perDay: {
    fontWeight: "400",
    color: "black"
  },
  youRequested: { fontSize: 22, color: mainGreen.mainGreen, fontWeight: "600" }
});

export default RequestCard;
