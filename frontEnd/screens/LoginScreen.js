import React from "react";
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Button,
  TextInput
} from "react-native";
import tintColor from "../constants/Colors";

const width = Dimensions.get("window").width;

export default class LoginScreen extends React.Component {
  state = {
    username: "tonyboi",
    password: "thisIsAPassword"
  };
  handleInput = (key, e) => {
    this.setState({ [key]: e });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}></View>
        <View style={styles.middle}>
          <Image
            source={require("../assets/images/KitletLogoBlanks.png")}
            style={{
              transform: [{ scaleX: 0.35 }, { scaleY: 0.35 }],
              marginBottom: -64,
              marginTop: -56
            }}
          />
        </View>
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
              onPress={this.props.loggedIn}
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
    flex: 1
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
    width: width / 2,
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
    marginTop: 16
  },
  buttonWrapper: { width: (width / 2) * 0.9, height: 64 },
  middle: {
    width,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
    marginTop: 120
  }
});
