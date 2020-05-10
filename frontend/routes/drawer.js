import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import Logout from '../screens/Signout'
import React from 'react';
import { View, Image, Dimensions, SafeAreaView } from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import Home from '../screens/Home'
const customContentComponent = props => (
  <SafeAreaView
    style={{ flex: 1, height: '100%', backgroundColor: '#43484d' }}
    forceInset={{ top: 'always', horizontal: 'never' }}
  >
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30
      }}
    >
    <Image
        source={require('../assets/signature.png')}
        style={{ width: '70%' }}
        resizeMode="contain"
      />
    </View>
    <View style={{ marginLeft: 20, marginTop:0 }}>
      <DrawerNavigatorItems {...props} />
    </View>
  </SafeAreaView>
);


const WINDOW_WIDTH = Dimensions.get('window').width;

const RootDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Logout: {
      screen: Logout,
    },
  },
    {
      contentOptions: {
        activeTintColor: '#548ff7',
        activeBackgroundColor: 'transparent',
        inactiveTintColor: '#ffffff',
        inactiveBackgroundColor: 'transparent',
        backgroundColor: '#43484d',
        labelStyle: {
          fontSize: 17,
          marginLeft: 10,
          marginTop: 20
        },
      },
      drawerWidth: Math.min(WINDOW_WIDTH * 0.8, 300),
      contentComponent: customContentComponent,
    }
);
    
  export default createAppContainer(RootDrawerNavigator);