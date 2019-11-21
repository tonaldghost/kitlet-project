import React from "react";
import ItemCard from "../components/ItemCard";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import SearchBar from "../components/SearchBar";
import { ScrollView } from "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import mainGreen from "../constants/Colors";
import tintColor from "../constants/Colors";

import Icon from "react-native-vector-icons/EvilIcons";
const myIcon = <Icon name="location" size={30} color={tintColor.tintColor} />;

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
    title: "1969 Minimoog",
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
    isAvailable: false,
    location: "Guiseley",
    price: 20,
    body:
      "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
  },
  {
    title: "1984 Minimoog",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
    isAvailable: false,
    location: "Guiseley",
    price: 10,
    body:
      "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
  },
  {
    title: "1984 Minimoog",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
    isAvailable: false,
    location: "Guiseley",
    price: 20,
    body:
      "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
  }
];

class DiscoverScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    takePicture: false,
    items: dummyData,
    bottomBorder: false
  };
  orderByPrice = ascending => {
    this.setState(currentState => {
      const itemsClone = [...currentState.items];
      const sortedItems = itemsClone.sort((a, b) => {
        return ascending ? a.price - b.price : b.price - a.price;
      });
      return { items: sortedItems };
    });
  };
  orderByLocation = ascending => {
    this.setState(currentState => {
      const itemsClone = [...currentState.items];
      const sortedItems = itemsClone.sort((a, b) => {
        return ascending
          ? a.location[0].charCodeAt() - b.location[0].charCodeAt()
          : b.location[0].charCodeAt() - a.location[0].charCodeAt();
      });
      return { items: sortedItems };
    });
  };
  bottomBorder = needed => {
    this.setState({ bottomBorder: needed });
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
        <SearchBar
          bottomBorder={this.bottomBorder}
          orderByPrice={this.orderByPrice}
          orderByLocation={this.orderByLocation}
          filterResults={this.filterResults}
          resetResults={this.resetResults}
        />
        <ScrollView>
          {this.state.items.map((item, index) => {
            return (
              <TouchableOpacity
                key={`${index}-view`}
                onPress={() =>
                  this.props.navigation.navigate("IndividualItem", item)
                }
              >
                <ItemCard key={index} props={item} />
              </TouchableOpacity>
            );
          })}
          {this.state.bottomBorder && (
            <View style={styles.bottomPadding}></View>
          )}
        </ScrollView>
      </View>
    );
  }
}

class IndividualItemScreen extends React.Component {
  render() {
    const width = Dimensions.get("window").width;
    const styles = StyleSheet.create({
      container: { paddingTop: 50, paddingBottom: 62 },
      itemCardImage: { flex: 1, width, height: 64, margin: 32 },
      innerContent: { flex: 2, width, paddingLeft: 16, paddingRight: 16 },
      fixedIsAvailable: {
        position: "absolute",
        right: 16,
        color: mainGreen.mainGreen,
        fontSize: 22
      },
      price: {
        fontSize: 22,
        marginTop: 16,
        fontWeight: "800",
        color: mainGreen.mainGreen
      },
      perDay: {
        fontSize: 22,
        marginTop: 16,
        fontWeight: "400",
        color: "black"
      },
      location: {
        marginTop: 16,
        marginBottom: 16,
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        marginLeft: -8
      },
      request: {
        backgroundColor: "#333",
        paddingBottom: 32
      },
      title: { fontSize: 32 },
      header: { fontSize: 22 },
      buttonHolder: {
        marginBottom: 32,
        display: "flex",
        width: width - 32,
        justifyContent: "center"
      }
    });
    const itemProps = this.props.navigation.state.params;

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image style={styles.itemCardImage} source={{ uri: itemProps.img }} />
        <View style={styles.innerContent}>
          <Text style={styles.title}>{itemProps.title}</Text>

          <View style={styles.location}>
            {myIcon}
            <Text>{itemProps.location}</Text>
          </View>
          <Text style={styles.body}>{itemProps.body}</Text>

          <Text style={styles.price}>
            £{itemProps.price}
            <Text style={styles.perDay}>/day</Text>
          </Text>
        </View>
        <View style={styles.buttonHolder}>
          <Button
            title="Request Item"
            style={styles.request}
            color={tintColor.tintColor}
          />
        </View>
      </View>
    );
  }
}

const DiscoverScreenNavigation = createStackNavigator(
  {
    Discover: DiscoverScreen,
    IndividualItem: IndividualItemScreen
  },
  {
    initialRouteName: "Discover"
  }
);

IndividualItemScreen.navigationOptions = {
  title: "Back To More Items"
};

const DicoverContainer = createAppContainer(DiscoverScreenNavigation);

const styles = StyleSheet.create({
  container: { paddingTop: 50, paddingBottom: 64 },
  header: { fontSize: 22 },
  bottomPadding: { height: 36, paddingBottom: 48, marginBottom: 16 }
});

export default class Discover extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return <DicoverContainer />;
  }
}
