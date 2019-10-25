import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { lighterWhite } from '../utils/Colors';

const SubTitle = ({ subtitle }) => (
	<Text style={[styles.titleText, { color: "#F24A0C"}]}>
		{subtitle}
	</Text>
);

const styles = StyleSheet.create({
	titleText: {
		fontSize: 16,
		fontWeight: '600',
		fontFamily:"monospace",
		textShadowColor: '#000',
		marginLeft: 7,
		

	}
});

export default SubTitle;
