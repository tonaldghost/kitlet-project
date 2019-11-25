import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const width = Dimensions.get("window").width;

export default class SearchBar extends Component {
  state = {
    searchInput: "",
    isSorting: false,
    priceAsc: false,
    locationAsc: false,
    availabilityAsc: false,
    isLoading: true
  };
  toggleSortBy = () => {
    this.setState(
      currentState => {
        return { isSorting: !currentState.isSorting };
      },
      () => {
        this.props.bottomBorder(this.state.isSorting);
      }
    );
  };
  handleInput = e => {
    if (e.nativeEvent.text.length < this.state.searchInput.length) {
      this.props.resetResults(),
        () => {
          this.props.filterResults();
        };
    } else if (this.state.searchInput.length > 2) {
      this.props.filterResults(e.nativeEvent.text);
    } else {
      this.props.resetResults();
    }
    this.setState({ searchInput: e.nativeEvent.text });
  };

  sortByPrice = () => {
    this.setState({ priceAsc: !this.state.priceAsc }, () => {
      this.state.priceAsc
        ? this.props.orderByPrice(true)
        : this.props.orderByPrice(false);
    });
  };
  sortByLocation = () => {
    this.setState({ locationAsc: !this.state.locationAsc }, () => {
      this.state.locationAsc
        ? this.props.orderByLocation(true)
        : this.props.orderByLocation(false);
    });
  };

  sortByAvailability = () => {
    this.setState({ availabilityAsc: !this.state.availabilityAsc }, () => {
      this.state.availabilityAsc
        ? this.props.orderByAvailability(true)
        : this.props.orderByAvailability(false);
    });

  };

  render() {
    return (
      <>
        <View style={styles.outerContainer}>
          <View style={styles.container}>
            <Ionicons name="ios-search" size={26} style={styles.icon} />
            <TextInput
              style={styles.searchBox}
              placeholder="Search Kitlet..."
              onChange={this.handleInput}
              value={this.state.searchInput}
            ></TextInput>
          </View>
          <Ionicons
            name="md-options"
            size={26}
            onPress={this.toggleSortBy}
            style={styles.toggleSorting}
          />
        </View>
        {this.state.isSorting && (
          <View style={styles.sortBox}>
            <Text style={styles.sortButtons} onPress={this.sortByPrice}>
              Price
            </Text>
            <Text style={styles.sortButtons} onPress={this.sortByLocation}>
              Location
            </Text>
            <Text style={styles.sortButtons} onPress={this.sortByAvailability}>

              Availablity
            </Text>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    width,
    alignItems: "center",
    flexDirection: "row"
  },
  container: {
    display: "flex",
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    width: width - 88,
    borderWidth: 1,
    borderColor: "#eee",
    marginLeft: 16,
    marginRight: 16
  },
  sortBox: {
    display: "flex",
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 16,
    width: width - 32,
    borderWidth: 1,
    borderColor: "#eee",
    marginLeft: 16,
    marginRight: 16
  },
  searchBox: {
    backgroundColor: "#f0f0f0",
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
    width: width - 88,
    fontSize: 18
  },
  icon: {
    backgroundColor: "#f0f0f0",
    paddingLeft: 32,
    paddingTop: 12.5,
    paddingBottom: 12.5,
    fontSize: 18,
    color: "#ddd"
  },
  toggleSorting: {
    backgroundColor: "white",
    paddingBottom: 14,
    color: "#333"
  },
  sortButtons: {
    paddingBottom: 16,
    paddingTop: 16,
    paddingRight: 32,
    paddingLeft: 32,
    textAlign: "center"
  }
});
