import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Button,
  TextInput
} from "react-native";
import RequestCard from "../components/RequestCard";
import tintColor from "../constants/Colors";
import * as api from "../utils/api";
import { Constants, Svg } from "expo";

// tony big Loading

const width = Dimensions.get("window").width;

export default class LoginScreen extends React.Component {
  state = {
    username: "tonyboi",
    password: "iloveKitlet"
  };
  handleInput = (key, e) => {
    this.setState({ [key]: e });
  };
  render() {
    const { showIncoming, incoming, outgoing } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.top}></View>
        <View style={styles.loginArea}>
          <TextInput
            style={styles.inputBox}
            onChangeText={e => this.handleInput("username", e)}
            value={this.state.username}
            placeholder="Username..."
          ></TextInput>
          <TextInput
            style={styles.inputBox}
            onChangeText={e => this.handleInput("password", e)}
            value={this.state.password}
            placeholder="Password..."
            secureTextEntry={true}
          ></TextInput>
          <View style={styles.btnWrapper}>
            <Button
              title="Login"
              style={styles.request}
              // onPress={() => {}} navigate to discoverScreen
              color={tintColor.tintColor}
            />
          </View>
        </View>
      </View>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1
  },
  top: {
    flex: 2
  },
  loginArea: {
    flex: 2,
    textAlign: "center",
    alignItems: "center"
  },
  request: {
    backgroundColor: "#333",
    paddingTop: 32
  },
  inputBox: {
    height: 32,
    width: width / 2.2,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: tintColor.tintColor,
    textAlign: "center"
  },
  btnWrapper: {
    width: width / 2,
    marginTop: 6
  },
  buttonWrapper: { width: (width / 2) * 0.9, height: 64 }
});
