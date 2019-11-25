import React from "react";
import ItemCard from "../components/ItemCard";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import SearchBar from "../components/SearchBar";
import CategorySelector from "../components/CategorySelector";
import { ScrollView } from "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IndividualItemScreen from "../components/IndividualItemScreen";
import * as api from "../utils/api";

// preparing thumbnail generator

class DiscoverScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    takePicture: false,
    items: [],
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
  orderByAvailability = ascending => {
    this.setState(currentState => {
      const itemsClone = [...currentState.items];
      const sortedItems = itemsClone.sort((a, b) => {
        return ascending
          ? a.isAvailable - b.isAvailable
          : b.isAvailable - a.isAvailable;
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
  sortByCategory = category => {
    this.setState(currentState => {
      const itemsClone = [...currentState.items];
      sortedItems = itemsClone.filter(item => {
        return item.category === category;
      });
      return { items: sortedItems };
    });
  };
  bottomBorder = needed => {
    this.setState({ bottomBorder: needed });
  };
  resetResults = (filtered = false, category = null) => {
    if (filtered) {
      this.getItemsFromApi(true, category);
    } else {
      this.getItemsFromApi();
    }
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
  getItemsFromApi = (filtered = false, category = null) => {
    if (filtered) {
      api.getAllItems().then(({ items }) => {
        this.setState({ items });
      });
    } else {
      api.getAllItems().then(({ items }) => {
        this.setState({ items });
      });
    }
  };
  componentDidMount = () => {
    this.getItemsFromApi();
  };
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          bottomBorder={this.bottomBorder}
          orderByPrice={this.orderByPrice}
          orderByLocation={this.orderByLocation}
          orderByAvailability={this.orderByAvailability}
          filterResults={this.filterResults}
          resetResults={this.resetResults}
        />
        <CategorySelector
          sortByCategory={this.sortByCategory}
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

<IndividualItemScreen />;

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
  container: { paddingTop: 50, paddingBottom: 168 },
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
