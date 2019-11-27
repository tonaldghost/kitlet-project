import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import tintColor from "../constants/Colors";
import ItemCard from "../components/ItemCard";
import IndividualItemScreen from "../components/IndividualItemScreen";
import * as api from "../utils/api";
const width = Dimensions.get("window").width;

class ProfileScreen extends React.Component {
  state = {
    exampleProfile: {
      username: "tonyboi",
      fullname: "Tony Duchars",
      img_url:
        "http://static.businessinsider.com/image/4f96c4c5ecad049470000014/image.jpg",
      location: "Pontefract"
    },
    userItems: [],
    isLoading: true
  };
  componentDidMount() {
    this.getUserItems(this.state.exampleProfile.username).then(items => {
      this.setState({ userItems: items, isLoading: false });
    });
  }

  getUserItems = username => {
    return api.fetchUserItems(username);
  };

  render() {
    const { username, fullname, img_url, location } = this.state.exampleProfile;
    return (
      <View style={styles.container}>
        <View style={styles.half}>
          <View style={styles.mainProfile}>
            <Image style={styles.profileImage} source={{ uri: img_url }} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{username}</Text>
            <Text style={styles.profileRating}>Stars...</Text>
          </View>
          <View style={styles.Info}>
            <Text style={styles.profileLocation}>
              {fullname} | {location}
            </Text>
          </View>
        </View>
        <ScrollView style={styles.profileItems}>
          {this.state.isLoading && (
            <ActivityIndicator size="large" color={tintColor.tintColor} />
          )}
          {this.state.userItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={`${index}-view`}
                onPress={() =>
                  this.props.navigation.navigate("IndividualItem", {
                    item,
                    editable: true
                  })
                }
              >
                <ItemCard key={index} props={item} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

<IndividualItemScreen />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  half: {
    flex: 1,
    backgroundColor: tintColor.tintColor,
    width,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  mainProfile: {
    height: 150,
    fontSize: 22,
    textAlign: "center",
    marginTop: 48
  },
  profileImage: {
    width: 144,
    height: 144,
    borderRadius: 999
  },
  profileInfo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    color: "white"
  },
  profileLocation: {
    color: "white",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 48
  },
  profileName: {
    color: "white",
    fontSize: 32,
    textAlign: "center"
  },
  profileRating: {
    color: "white",
    fontSize: 24,
    textAlign: "center"
  },
  profileInfo: { color: "white", fontSize: 24, textAlign: "center" },
  profileItems: {
    flex: 4,
    paddingTop: 8,
    fontSize: 22,
    width,
    textAlign: "center"
  }
});

ProfileScreen.navigationOptions = {
  header: null
};

const ProfileScreenNavigation = createStackNavigator(
  {
    Profile: ProfileScreen,
    IndividualItem: IndividualItemScreen
  },
  {
    initialRouteName: "Profile"
  }
);

IndividualItemScreen.navigationOptions = {
  title: "Back To More Items"
};

const ProfileContainer = createAppContainer(ProfileScreenNavigation);

export default class Profile extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return <ProfileContainer />;
  }
}
