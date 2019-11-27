import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import mainGreen from "../constants/Colors";
import tintColor from "../constants/Colors";
import MapView from "react-native-maps";
import * as api from "../utils/api";
import ApiKeys from "../constants/ApiKeys";

import Icon from "react-native-vector-icons/EvilIcons";
const myIcon = <Icon name="location" size={30} color={tintColor.tintColor} />;

export default class IndividualItemScreen extends React.Component {
  state = {
    lat: 0,
    lng: 0,
    messageBody: "",
    requestingItem: false,
    messageInFocus: false,
    loggedInUser: "tonyboi"
  };
  componentDidMount = () => {
    if (this.props.navigation.state.params.editable) {
      const itemProps = this.props.navigation.state.params.item;
      this.getItemLatLong(itemProps.location, ApiKeys.geoCoding.apiKey).then(
        response => {
          const { location } = response.data.results[0].geometry;
          this.setState({ ...location });
        }
      );
    } else {
      const itemProps = this.props.navigation.state.params;
      this.getItemLatLong(itemProps.location, ApiKeys.geoCoding.apiKey).then(
        response => {
          const { location } = response.data.results[0].geometry;
          this.setState({ ...location });
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
  handleInput = e => {
    this.setState({ messageBody: e.nativeEvent.text });
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
      }
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
          justifyContent: "center"
        }}
        behavior="position"
        enabled={this.state.messageInFocus}
      >
        <Image
          style={styles.itemCardImage}
          source={{ uri: itemProps.img_url }}
        />
        <View style={styles.innerContent}>
          <Text style={styles.title}>{itemProps.title}</Text>
          <Text style={styles.description}>{itemProps.body}</Text>
          <Text style={styles.price}>
            £{itemProps.price}
            <Text style={styles.perDay}>/day</Text>
          </Text>
          {this.state.lat !== 0 && (
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
        <View style={styles.buttonHolder}>
          <TextInput
            onFocus={() => this.focusOnMessage(true)}
            onBlur={() => this.focusOnMessage(false)}
            style={styles.messageBox}
            onChange={this.handleInput}
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
      </KeyboardAvoidingView>
    );
  }
}
