import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class DiscoverScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    takePicture: false,
    items: [
      {
        title: "1984 Minimoog",
        img: "aaroniousbosch-1574072891959",
        isAvailable: true,
        location: "Guiseley",
        pricePerDay: 42
      },
      {
        title: "Mic",
        img: "aaroniousbosch-1574072891959",
        isAvailable: true,
        location: "Guiseley",
        pricePerDay: 42
      }
    ]
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to Kitlet</Text>
        <Text>Hello</Text>
        {this.state.items.map((item, index) => {
          return <Text>{item.title}</Text>;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: "center" },
  header: { fontSize: 22 }
});
