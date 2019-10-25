import React from 'react';
import {
	StyleSheet,
	View,
	StatusBar,
	ActivityIndicator,
	ScrollView,
	AsyncStorage
} from 'react-native';
import { Form, Item } from 'native-base';
//import { LinearGradient } from 'expo';
import uuid from 'uuid/v1';
import { Font } from 'expo';

//import { primaryGradientArray } from './utils/Colors';
//import Header from './components/Header';
import SubTitle from './components/SubTitle';
import Input from './components/Input';
import List from './components/List';
import Button from './components/Button';

 

//const headerTitle = 'Todo';

export default class Main extends React.Component {
	state = {
		inputValue: '',
		loadingItems: false,
		allItems: {},
		isCompleted: false
	};

	static navigationOptions = {
		title : "What's Next",
		
	  };

	


	componentDidMount = () => {
		
		this.loadingItems();
	};

	newInputValue = value => {
		this.setState({
			inputValue: value
		});
	};

	loadingItems = async () => {
		try {
			const allItems = await AsyncStorage.getItem('Todos');
			this.setState({
				loadingItems: true,
				allItems: JSON.parse(allItems) || {}
			});
		} catch (err) {
			console.log(err);
		}
	};

	onDoneAddItem = () => {
		const { inputValue } = this.state;
		if (inputValue !== '') {
			this.setState(prevState => {
				const id = uuid();
				const newItemObject = {
					[id]: {
						id,
						isCompleted: false,
						text: inputValue,
						createdAt: Date.now()
					}
				};
				const newState = {
					...prevState,
					inputValue: '',
					allItems: {
						...prevState.allItems,
						...newItemObject
					}
				};
				this.saveItems(newState.allItems);
				return { ...newState };
			});
		}
	};

	deleteItem = id => {
		this.setState(prevState => {
			const allItems = prevState.allItems;
			delete allItems[id];
			const newState = {
				...prevState,
				...allItems
			};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};

	completeItem = id => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				allItems: {
					...prevState.allItems,
					[id]: {
						...prevState.allItems[id],
						isCompleted: true
					}
				}
			};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};

	incompleteItem = id => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				allItems: {
					...prevState.allItems,
					[id]: {
						...prevState.allItems[id],
						isCompleted: false
					}
				}
			};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};

	deleteAllItems = async () => {
		try {
			await AsyncStorage.removeItem('Todos');
			this.setState({ allItems: {} });
		} catch (err) {
			console.log(err);
		}
	};

	saveItems = newItem => {
		const saveItem = AsyncStorage.setItem('Todos', JSON.stringify(newItem));
	};

	render() {
		const { inputValue, loadingItems, allItems } = this.state;

		return (
			<View style={styles.container}>
				<View style={{flex:1}}>
				
				<View style={styles.inputContainer}>
					
				
					
					<Input
						inputValue={inputValue}
						onChangeText={this.newInputValue}
						onDoneAddItem={this.onDoneAddItem}
					/>
					
				</View>
				<View style={styles.list}>
					<View style={styles.column}>
						<SubTitle subtitle={'RECENT TO-DOs'} />
						<View style={styles.deleteAllButton}>
							<Button deleteAllItems={this.deleteAllItems} />
						</View>
					</View>

					{
						loadingItems ? (
						<ScrollView contentContainerStyle={styles.scrollableList}>
							{Object.values(allItems)
								.reverse()
								.map(item => (
									<List
										key={item.id}
										{...item}
										deleteItem={this.deleteItem}
										completeItem={this.completeItem}
										incompleteItem={this.incompleteItem}
									/>
								))}
						</ScrollView>
					) : (
						<ActivityIndicator size="large" color="white" />
					)}
				</View>
				</View>
				<View style={styles.footer}>
  
                </View>  
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F4F1ED"
	},
	centered: {
		alignItems: 'center'
	},
	inputContainer: {
		marginTop: 30,
		paddingLeft: 20,
		paddingRight: 20
	},
	list: {
		flex: 1,
		marginTop: 50,
		paddingLeft: 15,
		marginBottom: 0,
		marginLeft: 10,
	
	},
	scrollableList: {
		marginTop: 15,
		
	},
	column: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 5
	},
	deleteAllButton: {
		marginRight: 30,
		color:"#F24A0C"
		
	},
	footer:{
		backgroundColor:"#EE5A24",
		height:60,
		borderTopLeftRadius: 30,
	  }
});
