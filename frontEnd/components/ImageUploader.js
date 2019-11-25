import React from "react";
import { StyleSheet, Button, View, Alert, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";
import Icon from "react-native-vector-icons/MaterialIcons";
import tintColor from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const cameraIcon = (
  <Icon name="add-a-photo" size={36} color={tintColor.tintColor} />
);

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.FirebaseConfig);
}
const username = "tonyboi";

export default class ImageUploader extends React.Component {
  static navigationOptions = {
    header: null,
    takePicture: false
  };

  onChooseImagePress = async () => {
    // let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.uploadImage(result.uri, `${username}-${Date.now()}`)
        .then(({ metadata: { fullPath } }) => {
          this.props.updateFirebaseUrl(fullPath);
          Alert.alert("Image Added");
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
      this.uploadImage(result.uri, `${username}-${Date.now()}`)
        .then(({ metadata: { fullPath } }) => {
          this.props.updateFirebaseUrl(fullPath);
          Alert.alert("Image Added");
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

  cameraPressAlert = () => {
    Alert.alert(
      "Upload or Take Photo",
      "",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Upload",
          onPress: () => this.onChooseImagePress()
        },
        { text: "Take Photo", onPress: () => this.takePhoto() }
      ],
      { cancelable: true }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.cameraPressAlert}
          style={styles.iconCamera}
        >
          {cameraIcon}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 32, alignItems: "center" },
  buttons: { width },
  iconCamera: {
    borderColor: "grey",
    borderWidth: 1,
    width: width / 3,
    height: width / 3,
    borderRadius: 16,
    borderStyle: "dashed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
