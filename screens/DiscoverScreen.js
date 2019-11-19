import React from "react";
import ItemCard from "../components/ItemCard";
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
        img: "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
        isAvailable: true,
        location: "Guiseley",
        pricePerDay: 42
      },
      {
        title: "1984 Minimoog",
        img: "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
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
        {this.state.items.map((item, index) => {
          return <ItemCard key={index} props={item} />;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: "center" },
  header: { fontSize: 22 }
});
