import React from 'react';
import { StyleSheet, View, Text, Dimensions, KeyboardAvoidingView, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import mainGreen from '../constants/Colors';
import tintColor from '../constants/Colors';
import Icon from 'react-native-vector-icons/EvilIcons';
import ApiKeys from '../constants/ApiKeys';
import * as api from '../utils/api';

const myIcon = <Icon name="location" size={30} color={tintColor.tintColor} />;

export default class IndividualMessageScreen extends React.Component {
	static navigationOptions = {
		header: null
	};
	state = {
		messageTitle: '',
		messageBody: '',
		loggedInUser: 'tonyboi'
	};

	focusOnMessage = (bool) => {
		this.setState({ messageInFocus: bool });
	};

	handleInput = (e) => {
		this.setState({ messageBody: e.nativeEvent.text });
	};

	sendMessage = () => {
		const messageProps = this.props.navigation.state.params;
		return api
			.sendNewMessage(this.state.loggedInUser, messageProps.sent_from, messageProps.title, this.state.messageBody)
			.then((message) => {
				if (message.hasOwnProperty('body')) {
					Alert.alert('Message sent successfully');
				} else {
					Alert.alert('There was an issue when sending your message, please try again');
				}
			});
	};

	render () {
		const width = Dimensions.get('window').width;
		const styles = StyleSheet.create({
			container: { paddingTop: 50, paddingBottom: 62 },
			// itemCardImage: { flex: 2, width, height: 128, margin: 32 },
			innerContent: {
				flex: 2,
				width,
				margin: 32,
				paddingLeft: 16,
				paddingRight: 16
			},
			request: {
				backgroundColor: '#333',
				paddingBottom: 32
			},
			title: { fontSize: 32 },
			header: { fontSize: 22 },
			buttonHolder: {
				marginLeft: 48,
				marginBottom: 32,
				display: 'flex',
				width: width - 32,
				justifyContent: 'center'
			},
			messageBox: {
				height: 64,
				borderColor: '#ddd',
				borderWidth: 1,
				marginBottom: this.state.messageInFocus ? 32 : 16,
				borderRadius: 5,
				paddingLeft: 8
			},
			buttonFlex: {
				display: 'flex',
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'space-around'
			}
		});

		const messageProps = this.props.navigation.state.params;
		return (
			<KeyboardAvoidingView
				style={{
					flex: 1,
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center'
				}}
				behavior="position"
				enabled={this.state.messageInFocus}
			>
				<View style={styles.innerContent}>
					<Text style={styles.title}>{messageProps.title}</Text>
					<Text style={styles.price}>{messageProps.body}</Text>
				</View>
				<View style={styles.buttonHolder}>
					<TextInput
						onFocus={() => this.focusOnMessage(true)}
						onBlur={() => this.focusOnMessage(false)}
						style={styles.messageBox}
						onChange={this.handleInput}
						value={this.state.messageBody}
						placeholder="Reply to message"
					/>
					<Button title="Send Message" style={styles.buttonFlex} onPress={() => this.sendMessage()} />
				</View>
			</KeyboardAvoidingView>
		);
	}
}
