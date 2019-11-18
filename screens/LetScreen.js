import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import ImageUploader from "../components/ImageUploader";

export default function LetScreen() {
  return (
    <View style={styles.container}>
      <ImageUploader />
    </View>
  );
}

LetScreen.navigationOptions = {
  title: "Post New Item to Kitlet"
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: "center" }
});
