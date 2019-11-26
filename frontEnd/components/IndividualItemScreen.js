import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Text,
  Image,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import mainGreen from "../constants/Colors";
import tintColor from "../constants/Colors";
import * as api from "../utils/api";
import Icon from "react-native-vector-icons/EvilIcons";
import { TextInput } from "react-native-gesture-handler";

const myIcon = <Icon name="location" size={30} color={tintColor.tintColor} />;

export default class IndividualItemScreen extends React.Component {
  state = {
    requestingItem: false,
    messageBody: "",
    messageInFocus: false,
    loggedInUser: "tonyboi"
  };

  focusOnMessage = bool => {
    this.setState({ messageInFocus: bool });
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
      itemCardImage: { flex: 2, width, height: 128, margin: 32 },
      innerContent: {
        flex: 2,
        width,
        margin: 32,
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
        marginLeft: 48,
        marginBottom: 32,
        display: "flex",
        width: width - 32,
        justifyContent: "center"
      },
      messageBox: {
        height: 64,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: this.state.messageInFocus ? 32 : 16,
        borderRadius: 5,
        paddingLeft: 8
      }
    });
    // badger
    const itemProps = this.props.navigation.state.params;
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
