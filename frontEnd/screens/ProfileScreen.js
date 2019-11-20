import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Flatlist
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import tintColor from "../constants/Colors";
import ItemCard from "../components/ItemCard";

const width = Dimensions.get("window").width;

export default class ProfileScreen extends React.Component {
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
        <Text>Kit to Let:</Text>
        <ScrollView style={styles.profileItems}>
          {this.state.userItems.map((item, index) => {
            return <ItemCard key={index} props={item} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 2, alignItems: "center", justifyContent: "center" },
  mainProfile: { flex: 0.5, fontSize: 22, textAlign: "center", borderWidth: 1 },
  profileImage: {
    width: 144,
    height: 144,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: tintColor.tintColor
  },
  profileInfo: { flex: 1, borderWidth: 1 },
  profileName: {
    color: tintColor.tintColor,
    fontSize: 32,
    textAlign: "center"
  },
  profileRating: {
    color: tintColor.tintColor,
    fontSize: 24,
    textAlign: "center"
  },
  profileInfo: { color: "grey", fontSize: 24, textAlign: "center" },
  profileItems: {
    flex: 4,
    fontSize: 22,
    width,
    textAlign: "center",
    borderWidth: 1
  }
});

ProfileScreen.navigationOptions = {
  title: "KITLET"
};
