import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import Logout from '../screens/Signout'
const RootDrawerNavigator = createDrawerNavigator({
    Home: {
      screen: HomeStack
    },
    Logout: {
      screen: Logout,
    }
    
  });
  
  export default createAppContainer(RootDrawerNavigator);