import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  Dimensions
} from "react-native";
import mainGreen from "../constants/Colors";
import tintColor from "../constants/Colors";

import Icon from "react-native-vector-icons/EvilIcons";
const myIcon = <Icon name="location" size={30} color={tintColor.tintColor} />;

export default class IndividualItemScreen extends React.Component {
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
