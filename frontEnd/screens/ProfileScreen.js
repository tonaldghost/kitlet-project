import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
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
            return <ItemCard key={index} props={item} />;
          })}
        </ScrollView>
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
