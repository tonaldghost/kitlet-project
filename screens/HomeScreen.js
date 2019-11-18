import React from "react";
import { Image, StyleSheet, Button, Text, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.FirebaseConfig);
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    takePicture: false
  };

  onChooseImagePress = async () => {
    // let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.uploadImage(result.uri, Date.now())
        .then(res => {
          console.log(res);
          Alert.alert("Success");
        })
        .catch(error => {
          Alert.alert("Error: ", error.message);
        });
    }
  };

  takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync();
    // let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.uploadImage(result.uri, Date.now())
        .then(res => {
          console.log(res);
          Alert.alert("Success");
        })
        .catch(error => {
          Alert.alert("Error: ", error.message);
        });
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return ref.put(blob);
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Choose image..." onPress={this.onChooseImagePress} />
        <Button title="Take photo..." onPress={this.takePhoto} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: "center" }
});
