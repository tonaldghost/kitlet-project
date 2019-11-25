import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import tintColor from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome5";

const width = Dimensions.get("window").width;
export default class SearchBar extends Component {
  state = { activeCategory: "" };
  toggleCategory = category => {
    this.setState({ activeCategory: category }, () => {
      this.props.resetResults(true, category);
    });
  };

  render() {
    return (
      <>
        <View style={styles.outerContainer}>
          <TouchableOpacity
            onPress={() => this.toggleCategory("Audio")}
            style={
              this.state.activeCategory === "Audio"
                ? styles.categoryButtonActive
                : styles.categoryButton
            }
          >
            <Ionicons
              name="ios-microphone"
              size={30}
              style={
                this.state.activeCategory === "Audio"
                  ? styles.iconActive
                  : styles.icon
              }
            />
            <Text
              style={
                this.state.activeCategory === "Audio"
                  ? styles.buttonTextActive
                  : styles.buttonText
              }
            >
              Audio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.toggleCategory("Video")}
            style={
              this.state.activeCategory === "Video"
                ? styles.categoryButtonActive
                : styles.categoryButton
            }
          >
            <Ionicons
              name="ios-videocam"
              size={30}
              style={
                this.state.activeCategory === "Video"
                  ? styles.iconActive
                  : styles.icon
              }
            />
            <Text
              style={
                this.state.activeCategory === "Video"
                  ? styles.buttonTextActive
                  : styles.buttonText
              }
            >
              Video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.toggleCategory("Art")}
            style={
              this.state.activeCategory === "Art"
                ? styles.categoryButtonActive
                : styles.categoryButton
            }
          >
            <Icon
              name="paint-brush"
              size={26}
              style={
                this.state.activeCategory === "Art"
                  ? styles.faIconActive
                  : styles.faIcon
              }
            />

            <Text
              style={
                this.state.activeCategory === "Art"
                  ? styles.buttonTextActive
                  : styles.buttonText
              }
            >
              Art &amp; Design
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.toggleCategory("Tech")}
            style={
              this.state.activeCategory === "Tech"
                ? styles.categoryButtonActive
                : styles.categoryButton
            }
          >
            <Icon
              name="network-wired"
              size={26}
              style={
                this.state.activeCategory === "Tech"
                  ? styles.faIconActive
                  : styles.faIcon
              }
            />

            <Text
              style={
                this.state.activeCategory === "Tech"
                  ? styles.buttonTextActive
                  : styles.buttonText
              }
            >
              Tech
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    width: width - 32,
    justifyContent: "space-between",
    marginLeft: 16,
    marginRight: 16,
    alignItems: "center",
    flexDirection: "row"
  },
  icon: { fontSize: 30, color: tintColor.tintColor },
  iconActive: { fontSize: 30, color: "white" },
  categoryButton: {
    height: (width - 64) / 4,
    width: (width - 64) / 4,
    borderRadius: 5,
    marginBottom: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee"
  },
  categoryButtonActive: {
    height: (width - 64) / 4,
    width: (width - 64) / 4,
    borderRadius: 5,
    marginBottom: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: tintColor.tintColor
  },
  faIcons: {
    marginBottom: 4
  },
  buttonText: {
    color: tintColor.tintColor,
    marginTop: 4
  },
  buttonTextActive: {
    color: "white",
    marginTop: 4
  },
  activeIcon: {
    color: "white"
  },
  faIcon: {
    marginBottom: 4,
    color: tintColor.tintColor
  },
  faIconActive: {
    marginBottom: 4,
    color: "white"
  }
});
//
