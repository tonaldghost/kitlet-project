import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Button, Dimensions, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MessageCard from './MessageCard';
import tintColor from '../constants/Colors';
import IndividualMessageScreen from '../components/IndividualMessageScreen';
import * as api from '../utils/api';

const width = Dimensions.get('window').width;

class MessagesScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	state = {
		incoming: [],
		sent: [],
		bottomBorder: false,
		showIncoming: true,
		loggedInAs: 'tonyboi'
	};
	bottomBorder = (needed) => {
		this.setState({ bottomBorder: needed });
	};

	componentDidMount = () => {
		this.getIncomingMessages();
	};

	componentDidUpdate = () => {
		if (this.state.showIncoming) {
			this.getIncomingMessages();
		} else {
			this.getSentMessages();
		}
	};

	getIncomingMessages = () => {
		api.getIncomingMessages(this.state.loggedInAs).then((incoming) => {
			this.setState({ incoming });
		});
	};

	getSentMessages = () => {
		api.getSentMessages(this.state.loggedInAs).then((sent) => {
			this.setState({ sent });
		});
	};

	flipSent = () => {
		this.setState({ showIncoming: false });
	};

	flipIncoming = () => {
		this.setState({ showIncoming: true });
	};

	handleMessageNavigate = () => {
		this.props.hideHeader();
	};

	render () {
		const { showIncoming, incoming, sent } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.switchRequests}>
					<View style={styles.buttonFlex}>
						<View style={styles.buttonWrapper}>
							<Button title="Sent" color={tintColor.tintColor} onPress={this.flipSent} />
						</View>
						<View style={styles.buttonWrapper}>
							<Button title="Incoming" color={tintColor.tintColor} onPress={this.flipIncoming} />
						</View>
					</View>
				</View>
				{showIncoming ? (
					<ScrollView style={styles.scrollRequests}>
						{incoming.map((item, index) => {
							return (
								<TouchableOpacity
									key={`${index}-view`}
									onPress={() => {
										this.props.navigation.navigate('IndividualMessage', item);
									}}
								>
									<MessageCard message={item} showIncoming={showIncoming} />
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				) : (
					<ScrollView style={styles.scrollRequests}>
						{sent.map((item, index) => {
							return (
								<TouchableOpacity key={`${index}-view`}>
									<MessageCard message={item} showIncoming={showIncoming} />
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				)}
			</View>
		);
	}
}

<IndividualMessageScreen />;

const MessageScreenNavigation = createStackNavigator(
	{
		Messages: MessagesScreen,
		IndividualMessage: IndividualMessageScreen
	},
	{
		initialRouteName: 'Messages'
	}
);

IndividualMessageScreen.navigationOptions = {
	title: 'Back To Messages'
};

const MessageContainer = createAppContainer(MessageScreenNavigation);

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: 50,
		flex: 1
	},
	switchRequests: { height: 64 },
	scrollRequests: { flex: 1 },
	buttonFlex: {
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	buttonWrapper: { width: width / 2 * 0.9, height: 64 }
});

export default class Messages extends React.Component {
	static navigationOptions = {
		header: null
	};
	render () {
		return <MessageContainer />;
	}
}
