import React from 'react';
import { StyleSheet, View, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import mainGreen from '../constants/Colors';
import tintColor from '../constants/Colors';

import Icon from 'react-native-vector-icons/EvilIcons';
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

	render () {
		const width = Dimensions.get('window').width;
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
				position: 'absolute',
				right: 16,
				color: mainGreen.mainGreen,
				fontSize: 22
			},
			price: {
				fontSize: 16,
				marginTop: 16,
				fontWeight: '300'
			},
			perDay: {
				fontSize: 22,
				marginTop: 16,
				fontWeight: '400',
				color: 'black'
			},
			location: {
				marginTop: 16,
				marginBottom: 16,
				alignItems: 'center',
				display: 'flex',
				flexDirection: 'row',
				marginLeft: -8
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
			map: {
				height: 200,
				width,
				padding: 16
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
				</View>
			</KeyboardAvoidingView>
		);
	}
}
