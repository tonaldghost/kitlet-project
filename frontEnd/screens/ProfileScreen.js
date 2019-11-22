import React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  Dimensions
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import tintColor from "../constants/Colors";
import mainGreen from "../constants/Colors";
import ItemCard from "../components/ItemCard";

import Icon from "react-native-vector-icons/EvilIcons";
const myIcon = <Icon name="location" size={30} color={tintColor.tintColor} />;

const width = Dimensions.get("window").width;

class ProfileScreen extends React.Component {
  state = {
    exampleProfile: {
      username: "tonyboi",
      fullname: "Tony Duchars",
      img:
        "http://static.businessinsider.com/image/4f96c4c5ecad049470000014/image.jpg",
      location: "Pontefract"
    },
    userItems: [
      {
        title: "1984 Minimoog",
        img:
          "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
        isAvailable: true,
        location: "Guiseley",
        price: 10,
        body:
          "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
      },
      {
        title: "1984 Minimoog",
        img:
          "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
        isAvailable: false,
        location: "Woof",
        price: 20,
        body:
          "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
      },
      {
        title: "1984 Minimoog",
        img:
          "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
        isAvailable: true,
        location: "Guiseley",
        price: 10,
        body:
          "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
      },
      {
        title: "1984 Minimoog",
        img:
          "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
        isAvailable: true,
        location: "Guiseley",
        price: 10,
        body:
          "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
      },
      {
        title: "1984 Minimoog",
        img:
          "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
        isAvailable: true,
        location: "Woof",
        price: 20,
        body:
          "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
      },
      {
        title: "1984 Minimoog",
        img:
          "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
        isAvailable: true,
        location: "Guiseley",
        price: 10,
        body:
          "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
      }
    ]
  };
  componentDidMount() {
    //fetches all users items by username api request
  }
  render() {
    const { username, fullname, img, location } = this.state.exampleProfile;
    return (
      <View style={styles.container}>
        <View style={styles.half}>
          <View style={styles.mainProfile}>
            <Image style={styles.profileImage} source={{ uri: img }} />
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
          {this.state.userItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={`${index}-view`}
                onPress={() =>
                  this.props.navigation.navigate("IndividualItem", item)
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

class IndividualItemScreen extends React.Component {
  render() {
    const width = Dimensions.get("window").width;
    const styles = StyleSheet.create({
      container: { paddingTop: 50, paddingBottom: 62 },
      itemCardImage: { flex: 1, width, height: 64, margin: 32 },
      innerContent: { flex: 2, width, paddingLeft: 16, paddingRight: 16 },
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
        marginBottom: 32,
        display: "flex",
        width: width - 32,
        justifyContent: "center"
      }
    });
    const itemProps = this.props.navigation.state.params;

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image style={styles.itemCardImage} source={{ uri: itemProps.img }} />
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
          <Button
            title="Request Item"
            style={styles.request}
            color={tintColor.tintColor}
          />
        </View>
      </View>
    );
  }
}

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
  title: "KITLET",
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
