import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import tintColor from "../constants/Colors";
import ItemCard from "../components/ItemCard";
import IndividualItemScreen from "../components/IndividualItemScreen";
import MessagesScreen from "../components/MessagesScreen";
import { Ionicons } from "@expo/vector-icons";
import * as api from "../utils/api";

const width = Dimensions.get("window").width;

class ProfileScreen extends React.Component {
  state = {
    exampleProfile: {
      username: "tonyboi",
      fullname: "Tony Duchars",
      img_url:
        "http://static.businessinsider.com/image/4f96c4c5ecad049470000014/image.jpg",
      location: "Pontefract",
      headerShowing: true
    },
    userItems: []
  };
  componentDidMount() {
    this.getUserItems(this.state.exampleProfile.username).then(items => {
      this.setState({ userItems: items });
    });
  }

  getUserItems = username => {
    return api.fetchUserItems(username);
  };

  hideHeader = () => {
    this.setState({ headerShowing: false });
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
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Messages", this.hideHeader)
              }
              style={styles.messagesContainer}
            >
              <Ionicons name="ios-mail" size={16} style={styles.messagesIcon} />
              <Text style={styles.messages}>Messages</Text>
            </TouchableOpacity>
            <Image
              style={styles.stars}
              source={require("../assets/images/tonyStars.png")}
            />
          </View>
          <View style={styles.Info}>
            <Text style={styles.profileLocation}>
              {fullname} | {location}
            </Text>
          </View>
        </View>
        <ScrollView style={styles.profileItems}>
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
<MessagesScreen hideHeader={this.hideHeader} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  stars: {
    marginTop: 40,
    height: 30,
    width: 188
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
  messages: {
    color: "white",
    fontSize: 18,
    textAlign: "center"
  },
  profileInfo: { color: "white", fontSize: 24, textAlign: "center" },
  profileItems: {
    flex: 4,
    paddingTop: 8,
    fontSize: 22,
    width,
    textAlign: "center"
  },
  messagesContainer: {
    marginTop: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  messagesIcon: {
    color: "white",
    marginRight: 8
  }
});

ProfileScreen.navigationOptions = {
  header: null
};

const ProfileScreenNavigation = createStackNavigator(
  {
    Profile: ProfileScreen,
    IndividualItem: IndividualItemScreen,
    Messages: MessagesScreen
  },
  {
    initialRouteName: "Profile"
  }
);

IndividualItemScreen.navigationOptions = {
  title: "Back To More Items"
};

MessagesScreen.navigationOptions = {
  title: "Back To Profile"
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
