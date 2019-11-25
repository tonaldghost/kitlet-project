import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Dimensions
} from "react-native";
import RequestCard from "../components/RequestCard";
import tintColor from "../constants/Colors";

// tony dev branch

const width = Dimensions.get("window").width;

export default class NotificationsScreen extends React.Component {
  state = {
    incoming: [
      {
        request_user: "umayrs95",
        item_id: 5,
        body:
          "my name is umayr and I ask tony for things because he always delivers",
        title: "some musical thing",
        owner: "tonyboi",
        category: "Music",
        img_url:
          "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Fumayrs95-1574072432159?alt=media&token=d304da10-8271-4c7b-803c-bee8307a254b",
        is_available: true,
        price: 18,
        location: "Guiseley"
      }
    ],
    outgoing: [
      {
        request_user: "tonyboi",
        item_id: 1,
        body: "my name is tony and I like to request things.",
        title: "umayrs musical device",
        owner: "umayrs95",
        category: "Music",
        img_url:
          "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Fumayrs95-1574072424794?alt=media&token=94a065e2-bfbb-41c3-add4-0e2a9fbc82b2",
        is_available: true,
        price: 18,
        location: "Bradford"
      }
    ],
    bottomBorder: false,
    showIncoming: true
  };
  bottomBorder = needed => {
    this.setState({ bottomBorder: needed });
  };

  flipIncoming = () => {
    this.setState({ showIncoming: true });
  };
  flipOutgoing = () => {
    this.setState({ showIncoming: false });
  };
  render() {
    const { showIncoming, incoming, outgoing } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.switchRequests}>
          <View style={styles.buttonFlex}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Incoming"
                color={tintColor.tintColor}
                onPress={this.flipIncoming}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Ougoing"
                color={tintColor.tintColor}
                onPress={this.flipOutgoing}
              />
            </View>
          </View>
        </View>
        {showIncoming ? (
          <ScrollView style={styles.scrollRequests}>
            {incoming.map((item, index) => {
              return (
                <TouchableOpacity key={`${index}-view`}>
                  <RequestCard item={item} showIncoming={showIncoming} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <ScrollView style={styles.scrollRequests}>
            {outgoing.map((item, index) => {
              return (
                <TouchableOpacity key={`${index}-view`}>
                  <RequestCard item={item} showIncoming={showIncoming} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}

NotificationsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 50,
    flex: 1
  },
  switchRequests: { height: 64 },
  scrollRequests: { flex: 1 },
  buttonFlex: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buttonWrapper: { width: (width / 2) * 0.9, height: 64 }
});
