import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

export default class SearchBar extends Component {
  state = {
    searchInput: ""
  };
  handleInput = e => {
    if (this.state.searchInput.length > 2) {
      // passed refefernere as prop
      this.props.filterResults(e.nativeEvent.text);
      // console.log("woof");
    }
    this.setState({ searchInput: e.nativeEvent.text });
  };
  render() {
    return (
      <View style={styles.container}>
        <Ionicons name="ios-search" size={26} style={styles.icon} />
        <TextInput
          style={styles.searchBox}
          placeholder="search kitlet..."
          onChange={this.handleInput}
          value={this.state.searchInput}
        ></TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  searchBox: {
    backgroundColor: "#f0f0f0",
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
    width,
    fontSize: 18
  },
  icon: {
    backgroundColor: "#f0f0f0",
    paddingLeft: 16,
    paddingTop: 12.5,
    paddingBottom: 12.5,
    fontSize: 18,
    color: "#ddd"
  }
});
