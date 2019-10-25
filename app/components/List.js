import React, { Component } from 'react';
import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import {
	itemListText,
	itemListTextStrike,
	circleInactive,
	circleActive,
	deleteIconColor
} from '../utils/Colors';

const { width } = Dimensions.get('window');

class List extends Component {
	onToggleCircle = () => {
		const { isCompleted, id, completeItem, incompleteItem } = this.props;
		if (isCompleted) {
			incompleteItem(id);
		} else {
			completeItem(id);
		}
	};

	render() {
		const { text, deleteItem, id, isCompleted } = this.props;

		return (
			<View style={styles.container}>
				<View style={styles.column}>
					<TouchableOpacity onPress={this.onToggleCircle}>
						
							{ isCompleted
									? ( <View style={styles.button1}>
										
											<FontAwesome
												name="check-circle"
												size={24}
												color={"#F24A0C"}
											/>
										
									</View> )
									
									: (<View style={styles.button1}>
										
											<Entypo
												name="circle"
												size={20}
												color={"#988E8E"}
											/>
										
									</View> )
							}
					
					</TouchableOpacity>
					<Text
						style={[
							styles.text,
							isCompleted
								? {
										color: "#c4c4cc",
										textDecorationLine: 'line-through'
								  }

								: { color: itemListText }
						]}
					>
						{text}
					</Text>
				</View>
				{isCompleted ? (
					<View style={styles.button2}>
						<TouchableOpacity onPressOut={() => deleteItem(id)}>
							<MaterialIcons
								name="cancel"
								size={24}
								color={"#988E8E"}
							/>
						</TouchableOpacity>
					</View>
				) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: width - 50,
		flexDirection: 'row',
		borderRadius: 25,
		backgroundColor: 'white',
		height: width / 8,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 5,
		marginBottom: 10,
		...Platform.select({
			ios: {
				shadowColor: 'rgb(50,50,50)',
				shadowOpacity: 0.8,
				shadowRadius: 2,
				shadowOffset: {
					height: 2,
					width: 0
				}
			},
			android: {
				elevation: 5
			}
		})
	},
	column: {
		flexDirection: 'row',
		alignItems: 'center',
		width: width / 1.5,
		
	},
	text: {
		fontWeight: '500',
		fontSize: 18,
		marginVertical: 15,
		
	},
	button1: {
		
		margin: 10
	},
	button2: {
		marginRight: 10
	}
});

export default List;
