
import React from 'react';
import { StyleSheet, View, Button, Text, Image, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import mainGreen from '../constants/Colors';
import tintColor from '../constants/Colors';
import MapView from 'react-native-maps';
import * as api from '../utils/api';
import ApiKeys from '../constants/ApiKeys';

import Icon from 'react-native-vector-icons/EvilIcons';
const myIcon = <Icon name="location" size={30} color={tintColor.tintColor} />;


export default class IndividualItemScreen extends React.Component {
  state = {
		lat: 0,
		lng: 0
    requestingItem: false,
    messageBody: "",
    messageInFocus: false,
    loggedInUser: "tonyboi"
  };
  	componentDidMount = () => {
		const itemProps = this.props.navigation.state.params;
		this.getItemLatLong(itemProps.location, ApiKeys.geoCoding.apiKey).then((response) => {
			const { location } = response.data.results[0].geometry;
			this.setState({ ...location });
		});
	};

  focusOnMessage = bool => {
    this.setState({ messageInFocus: bool });
  };

  requestItem = ({ item_id }) => {
    if (this.state.messageBody.length < 10)
      Alert.alert("Please provide a message for your request");
    else {
      api
        .postNewRequest(
          item_id,
          this.state.messageBody,
          this.state.loggedInUser
        )
        .then(({ status }) => {
          if (status === 201) {
            Alert.alert("Your request has been successfully sent");
          } else {
            Alert.alert(
              "There has been an error sending your request, please try again"
            );
          }
        });
    }
  };
  handleInput = e => {
    this.setState({ messageBody: e.nativeEvent.text });
  };
  render() {
    const width = Dimensions.get("window").width;
    const styles = StyleSheet.create({
      container: { paddingTop: 50, paddingBottom: 62 },
      itemCardImage: { flex: 2, width, height: 128, margin: 32 },
      innerContent: {
        flex: 2,
        width,
        margin: 32,
        paddingLeft: 16,
        paddingRight: 16
      },
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
        marginLeft: 48,
        marginBottom: 32,
        display: "flex",
        width: width - 32,
        justifyContent: "center"
      },
      messageBox: {
        height: 64,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: this.state.messageInFocus ? 32 : 16,
        borderRadius: 5,
        paddingLeft: 8
      }, 		map: {
				height: 200,
				width,
				padding: 16
			}
    });
	getItemLatLong = (location, apiKey) => {
		return api.getAreaCoordinates(location, apiKey);
	};

    const itemProps = this.props.navigation.state.params;
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          alignItems: "center",
          display: "flex",
          justifyContent: "center"
        }}
        behavior="position"
        enabled={this.state.messageInFocus}
      >
        <Image
          style={styles.itemCardImage}
          source={{ uri: itemProps.img_url }}
        />
        <View style={styles.innerContent}>
          <Text style={styles.title}>{itemProps.title}</Text>



          <Text style={styles.price}>
            £{itemProps.price}
            <Text style={styles.perDay}>/day</Text>
          </Text>
        </View>
        <View style={styles.buttonHolder}>
          <TextInput
            onFocus={() => this.focusOnMessage(true)}
            onBlur={() => this.focusOnMessage(false)}
            style={styles.messageBox}
            onChange={this.handleInput}
            value={this.state.messageBody}
            placeholder="Include a message with your request"
          ></TextInput>
    {this.state.lat !== 0 && (
						<MapView
							style={styles.map}
							initialRegion={{
								latitude: this.state.lat,
								longitude: this.state.lng,
								latitudeDelta: 0.1,
								longitudeDelta: 0.1
							}}
						/>
					)}
          <Button
            title="Request Item"
            style={styles.request}
            onPress={() => this.requestItem(itemProps)}
            color={tintColor.tintColor}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
