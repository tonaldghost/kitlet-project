import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class DiscoverScreen extends React.Component {
  static navigationOptions = {
    header: null,
    takePicture: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to Kitlet</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: "center" },
  header: { fontSize: 22}
});
