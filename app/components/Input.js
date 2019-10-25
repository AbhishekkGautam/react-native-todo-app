import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { inputPlaceholder } from '../utils/Colors';

const Input = ({ inputValue, onChangeText, onDoneAddItem }) => (
	<TextInput
		style={styles.input}
		value={inputValue}
		onChangeText={onChangeText}
		placeholder="Type here your next To-Do!"
		placeholderTextColor={"#988E8E"}
		multiline={true}
		autoCapitalize="sentences"
		underlineColorAndroid="transparent"
		selectionColor={'#988E8E'}
		maxLength={30}
		returnKeyType="done"
		autoCorrect={false}
		blurOnSubmit={true}
		onSubmitEditing={onDoneAddItem}
	/>
);

const styles = StyleSheet.create({
	input: {
		paddingTop: 10,
		paddingRight: 15,
		fontSize: 18,
		color: '#000',
		fontWeight: '500',
		borderBottomColor:'#f39c12',
		borderBottomWidth: 2  ,
		paddingLeft: 10,
		margin: 20,
		paddingBottom: 7,
		fontFamily: "monospace"
	}
});

export default Input;
