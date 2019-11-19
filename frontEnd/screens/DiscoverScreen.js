import React from "react";
import ItemCard from "../components/ItemCard";
import { StyleSheet, View, Text } from "react-native";
import SearchBar from "../components/SearchBar";
import { ScrollView } from "react-native-gesture-handler";

const dummyData = [
  {
    title: "1984 Minimoog",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
    isAvailable: true,
    location: "Guiseley",
    price: 10,
    body:
      "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
  },
  {
    title: "1984 Minimoog",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
    isAvailable: true,
    location: "Woof",
    price: 20,
    body:
      "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
  },
  {
    title: "1984 Minimoog",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
    isAvailable: true,
    location: "Guiseley",
    price: 10,
    body:
      "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
  },
  {
    title: "1984 Minimoog",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
    isAvailable: true,
    location: "Guiseley",
    price: 20,
    body:
      "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
  },
  {
    title: "1984 Minimoog",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
    isAvailable: true,
    location: "Guiseley",
    price: 10,
    body:
      "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
  },
  {
    title: "1984 Minimoog",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
    isAvailable: true,
    location: "Guiseley",
    price: 20,
    body:
      "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
  }
];

export default class DiscoverScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    takePicture: false,
    items: dummyData
  };
  orderByPrice = ascending => {
    console.log("ordering by price function", ascending);
    this.setState(currentState => {
      const itemsClone = [...currentState.items];
      const sortedItems = itemsClone.sort((a, b) => {
        return ascending ? a.price - b.price : b.price - a.price;
      });
      return { items: sortedItems };
    });
  };
  resetResults = () => {
    this.setState({ items: dummyData });
  };
  filterResults = searchTerm => {
    const itemsClone = [...this.state.items];
    const filteredItems = itemsClone.filter(item => {
      return (
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    this.setState({ items: filteredItems });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Kitlet</Text>
        <SearchBar
          orderByPrice={this.orderByPrice}
          filterResults={this.filterResults}
          resetResults={this.resetResults}
        />
        <ScrollView>
          {this.state.items.map((item, index) => {
            return <ItemCard key={index} props={item} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { paddingTop: 50, paddingBottom: 84 },
  header: { fontSize: 22, textAlign: "center", borderWidth: 1 }
});
