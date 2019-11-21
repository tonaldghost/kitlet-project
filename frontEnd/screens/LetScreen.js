import React from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  KeyboardAvoidingView
} from "react-native";
import ImageUploader from "../components/ImageUploader";
import { ScrollView } from "react-native-gesture-handler";
import tintColor from "../constants/Colors";

const width = Dimensions.get("window").width;

// tony branch

export default class LetScreen extends React.Component {
  state = {
    whatItem: "",
    describeItem: "",
    allCategories: [
      "cheese",
      "swamp ferret",
      "garden gnome",
      "melons -->",
      "honey-dew",
      "watermelon"
    ],
    selectedCat: "",
    price: 0
  };
  componentDidMount = () => {
    //update allCategories upon mounting this page for scroll
  };
  handleInput = (key, e) => {
    this.setState({ [key]: e });
  };
  render() {
    const { whatItem, describeItem, allCategories, price } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.top}>
          <ImageUploader />
        </View>
        <View style={styles.middle}>
          <TextInput
            style={styles.addListing}
            onChangeText={e => this.handleInput("whatItem", e)}
            placeholder="What are you letting?"
            value={whatItem}
          />
          <TextInput
            style={styles.describeListing}
            onChangeText={e => this.handleInput("describeItem", e)}
            placeholder="Describe it best you can..."
            value={describeItem}
          />
        </View>
        <ScrollView style={styles.categoryDrop} horizontal={true}>
          {allCategories.map((cat, idx) => {
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => this.setState({ selectedCat: cat })}
                style={styles.catButton}
              >
                <Text>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.bottom}>
          <TextInput
            style={styles.addPrice}
            keyboardType="numeric"
            onChangeText={e => this.handleInput("price", e)}
            placeholder="Add Price?"
            number={price}
            maxLength={6}
          />
          <Button
            title="Submit Listing"
            style={styles.submit}
            color={tintColor.tintColor}
          >
            <Text>Submit</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

LetScreen.navigationOptions = {
  title: "Post New Item to Kitlet"
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  top: {
    flex: 3,
    width,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "grey"
  },
  middle: {
    flex: 2.5,
    width,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "grey"
  },
  categoryDrop: { flex: 0.5, borderWidth: 1, width },
  bottom: { flex: 3, width, alignItems: "center", borderWidth: 1 },
  addListing: {
    height: 40,
    width: width * 0.9,
    borderColor: "gray",
    borderBottomWidth: 1,
    fontSize: 16
  },
  describeListing: {
    fontSize: 16,
    width: width * 0.9,
    height: 40
  },
  catButton: {
    fontSize: 16,
    width: width / 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 16,
    margin: 8
  },
  addPrice: {
    width: width * 0.75,
    borderColor: "gray",
    borderBottomWidth: 1,
    fontSize: 16,
    display: "flex",
    alignItems: "flex-end"
  }
});
