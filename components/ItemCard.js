import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import mainGreen from "../constants/Colors";

const ItemCard = ({ props }) => {
  return (
    <View style={styles.itemCardContainer}>
      <Image style={styles.itemCardImage} source={{ uri: props.img }} />
      <View style={styles.innerContent}>
        {props.isAvailable && (
          <Text style={styles.fixedIsAvailable}>Available</Text>
        )}
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.location}>{props.location}</Text>
      </View>
    </View>
  );
};

// rerender

const styles = StyleSheet.create({
  title: { fontSize: 22 },
  itemCardContainer: {
    display: "flex",
    minHeight: 128,
    marginLeft: 16,
    marginRight: 16,
    width: "auto",
    flexDirection: "row",
    marginBottom: 32,
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
    color: mainGreen.mainGreen
  },
  innerContent: { flex: 2, paddingLeft: 16 },
  itemCardImage: { flex: 1, width: 64, height: 64, margin: "auto" }
});

export default ItemCard;
