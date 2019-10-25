
import { createStackNavigator, createAppContainer,} from "react-navigation";
import Main from './app/Main';

import { Font } from 'expo';



const MainNavigator = createStackNavigator(
  {
  Main: {screen: Main},

},
  { 
    defaultNavigationOptions: {
	  headerTintColor: "#fff",
	

      headerStyle: {
		backgroundColor: "#EE5A24",
		borderBottomRightRadius: 25,
      },
      headerTitleStyle: {
        color: "#F1F1F1",
		fontFamily:"Roboto",
	  fontWeight:'100',
		fontSize:21,
		
        
      },
      
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;
