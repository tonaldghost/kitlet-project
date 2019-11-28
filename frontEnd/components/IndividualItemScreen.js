import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  Dimensions,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import mainGreen from "../constants/Colors";
import tintColor from "../constants/Colors";
import MapView from "react-native-maps";
import * as api from "../utils/api";
import ApiKeys from "../constants/ApiKeys";
import { Ionicons } from "@expo/vector-icons";

export default class IndividualItemScreen extends React.Component {
  state = {
    lat: 0,
    lng: 0,
    messageBody: "",
    requestingItem: false,
    messageInFocus: false,
    loggedInUser: "tonyboi",
    canEdit: false,
    editingScreen: false,
    isLoading: true,
    updatedTitle: this.props.navigation.state.params.editable
      ? this.props.navigation.state.params.item.title
      : "",
    updatedBody: this.props.navigation.state.params.editable
      ? this.props.navigation.state.params.item.body
      : "",
    updatedPrice: this.props.navigation.state.params.editable
      ? this.props.navigation.state.params.item.price.toString()
      : ""
  };
  editItem = () => {
    this.setState(currentState => {
      return {
        editingScreen: !currentState.editingScreen
      };
    });
  };
  componentDidMount = () => {
    if (this.props.navigation.state.params.editable) {
      const itemProps = this.props.navigation.state.params.item;
      this.getItemLatLong(itemProps.location, ApiKeys.geoCoding.apiKey).then(
        response => {
          const { location } = response.data.results[0].geometry;
          this.setState({ ...location, canEdit: true, isLoading: false });
        }
      );
    } else {
      const itemProps = this.props.navigation.state.params;
      this.getItemLatLong(itemProps.location, ApiKeys.geoCoding.apiKey).then(
        response => {
          const { location } = response.data.results[0].geometry;
          this.setState({ ...location, isLoading: false });
        }
      );
    }
  };

  focusOnMessage = bool => {
    this.setState({ messageInFocus: bool });
  };
  getItemLatLong = (location, apiKey) => {
    return api.getAreaCoordinates(location, apiKey);
  };
  requestItem = ({ item_id }) => {
    if (this.state.messageBody.length < 10)
      Alert.alert("Please provide a message for your request");
    else {
      api
        .postNewRequest(
          item_id,
          this.state.messageBody,
          this.state.loggedInUser
        )
        .then(({ status }) => {
          if (status === 201) {
            Alert.alert("Your request has been successfully sent");
          } else {
            Alert.alert(
              "There has been an error sending your request, please try again"
            );
          }
        });
    }
  };
  updateItem = ({ item_id }) => {
    api
      .patchItem({
        item_id,
        title: this.state.updatedTitle,
        body: this.state.updatedBody,
        price: +this.state.updatedPrice
      })
      .then(({ status }) => {
        if (status === 202) {
          Alert.alert("Item has been successfully updated");
        } else if (status === 401) {
          Alert.alert(
            "Sorry, can't update an item that is currently being let."
          );
        } else {
          Alert.alert("Sorry, we have encountered an error. Please try again");
        }
      });
  };
  handleInput = (text, toChange) => {
    this.setState({ [toChange]: text });
  };
  render() {
    const width = Dimensions.get("window").width;
    const styles = StyleSheet.create({
      container: { paddingTop: 50, paddingBottom: 62 },
      itemCardImage: {
        flex: 2,
        width,
        height: 72,
        marginLeft: 32,
        marginRight: 32
      },
      innerContent: {
        flex: 2,
        width,
        marginLeft: 32,
        marginRight: 32,
        paddingLeft: 16,
        paddingRight: 16
      },
      fixedIsAvailable: {
        position: "absolute",
        right: 16,
        color: mainGreen.mainGreen,
        fontSize: 22
      },
      price: {
        fontSize: 22,
        marginTop: 16,
        marginBottom: 16,
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
      title: { fontSize: 32, marginTop: 16 },
      header: { fontSize: 22 },
      buttonHolder: {
        marginLeft: 48,
        marginBottom: 32,
        display: "flex",
        width: width - 32,
        justifyContent: "center"
      },
      messageBox: {
        height: 32,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: this.state.messageInFocus ? 32 : 16,
        borderRadius: 5,
        paddingLeft: 8
      },
      map: {
        height: 200,
        width: width - 32,
        padding: 16
      },
      description: {
        fontSize: 14
      },
      editButtonContainer: {
        textAlign: "right",
        alignSelf: "flex-end",
        display: "flex",
        flexDirection: "row",
        marginTop: 16,
        alignItems: "center"
      },
      editButton: { textAlign: "center", marginRight: 4 },
      priceChangeHolder: {
        display: "flex",
        flexDirection: "row"
      },
      addLeft: { paddingLeft: 8 },
      editPrompt: { fontSize: 22 },
      hideUnlessUpdating: {
        opacity: this.state.editingScreen ? 1 : 0
      },
      buttonPadding: { height: 32 }
    });
    const itemProps = this.props.navigation.state.params.editable
      ? this.props.navigation.state.params.item
      : this.props.navigation.state.params;
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          opacity: this.state.isLoading ? 0 : 1
        }}
        behavior="position"
        enabled={this.state.messageInFocus}
      >
        <Image
          style={styles.itemCardImage}
          source={{ uri: itemProps.img_url }}
        />
        <View style={styles.innerContent}>
          {this.state.canEdit && (
            <TouchableOpacity
              onPress={this.editItem}
              style={styles.editButtonContainer}
            >
              {!this.state.editingScreen ? (
                <>
                  <Ionicons
                    name="ios-build"
                    size={16}
                    style={styles.editButton}
                  />
                  <Text style={styles.editPrompt}>Edit</Text>
                </>
              ) : (
                <>
                  <Ionicons
                    name="ios-build"
                    size={16}
                    style={styles.editButton}
                  />
                  <Text style={styles.editPrompt}>Cancel</Text>
                </>
              )}
            </TouchableOpacity>
          )}
          {!this.state.editingScreen ? (
            <Text style={styles.title}>{itemProps.title}</Text>
          ) : (
            <TextInput
              style={styles.title}
              placeholder={"Change Title"}
              onFocus={() => this.focusOnMessage(true)}
              value={this.state.updatedTitle}
              onBlur={() => this.focusOnMessage(false)}
              onChange={e =>
                this.handleInput(e.nativeEvent.text, "updatedTitle")
              }
            ></TextInput>
          )}

          {!this.state.editingScreen ? (
            <Text style={styles.description}>{itemProps.body}</Text>
          ) : (
            <TextInput
              placeholder={"Change description"}
              style={styles.description}
              value={this.state.updatedBody}
              onChange={e =>
                this.handleInput(e.nativeEvent.text, "updatedBody")
              }
              onFocus={() => this.focusOnMessage(true)}
              onBlur={() => this.focusOnMessage(false)}
            ></TextInput>
          )}
          {!this.state.editingScreen ? (
            <Text style={styles.price}>
              £{itemProps.price}
              <Text style={styles.perDay}>/day</Text>
            </Text>
          ) : (
            <>
              <View style={styles.priceChangeHolder}>
                <Text style={styles.price}>£</Text>
                <TextInput
                  onFocus={() => this.focusOnMessage(true)}
                  onBlur={() => this.focusOnMessage(false)}
                  placeholder={"Change Price Per Day"}
                  style={(styles.price, styles.addLeft)}
                  value={this.state.updatedPrice}
                  keyboardType="numeric"
                  onChange={e =>
                    this.handleInput(e.nativeEvent.text, "updatedPrice")
                  }
                ></TextInput>
              </View>
            </>
          )}
          {this.state.lat !== 0 && !this.state.canEdit && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: this.state.lat,
                longitude: this.state.lng,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
              }}
            />
          )}
        </View>
        {!this.state.canEdit && (
          <View style={styles.buttonHolder}>
            <TextInput
              onFocus={() => this.focusOnMessage(true)}
              onBlur={() => this.focusOnMessage(false)}
              style={styles.messageBox}
              onChange={e =>
                this.handleInput(e.nativeEvent.text, "messageBody")
              }
              value={this.state.messageBody}
              placeholder="Include a message with your request"
            ></TextInput>
            <Button
              title="Request Item"
              style={styles.request}
              onPress={() => this.requestItem(itemProps)}
              color={tintColor.tintColor}
            />
          </View>
        )}
        {this.state.canEdit && (
          <View style={styles.buttonHolder}>
            {this.state.editingScreen ? (
              <Button
                title="Update Item"
                opacity={this.state.editingScreen ? 1 : 0}
                onPress={() => this.updateItem(itemProps)}
                color={tintColor.tintColor}
              />
            ) : (
              <View style={styles.buttonPadding}></View>
            )}
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}
