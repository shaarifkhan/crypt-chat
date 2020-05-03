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
      navigationOptions: {
        headerTitle: () => <Header title="Log Out" />,
      },
    }
  });
  
  export default createAppContainer(RootDrawerNavigator);