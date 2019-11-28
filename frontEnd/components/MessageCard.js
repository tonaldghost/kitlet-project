import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import mainGreen from '../constants/Colors';
import mainRed from '../constants/Colors';

const MessageCard = ({ message, showIncoming }) => {
	return (
		<View style={styles.MessageCardContainer}>
			<View style={styles.innerContent}>
				{showIncoming ? (
					<Text style={styles.title}>{message.title}</Text>
				) : (
					<Text style={styles.sentTitle}>{message.title}</Text>
				)}
				{showIncoming ? (
					<Text style={styles.owner}>From: {message.sent_from}</Text>
				) : (
					<Text style={styles.owner}>Sent to: {message.sent_to}</Text>
				)}
				<Text style={styles.createdAt}>Sent at: {message.created_at}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	title: { fontSize: 22, color: mainRed.mainRed, fontWeight: '600' },
	owner: { fontSize: 16 },
	MessageCardContainer: {
		display: 'flex',
		minHeight: 120,
		marginLeft: 16,
		marginRight: 16,
		width: 'auto',
		flexDirection: 'row',
		marginBottom: 8,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		borderColor: '#eee',
		borderWidth: 1
	},
	innerContent: { flex: 2, paddingLeft: 16 },
	createdAt: {
		fontWeight: '800',
		color: mainGreen.mainGreen
	},
	sentTitle: { fontSize: 22, color: mainGreen.mainGreen, fontWeight: '600' }
});

export default MessageCard;
