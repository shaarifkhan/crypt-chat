import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import Signup from '../screens/signup';
import Login from '../screens/login';
import Header from '../shared/header';
import Home from '../screens/Home'
import Chat from '../screens/Chat'
const screens = {
 
  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle:() => <Header title='LOGIN'/>,
    }
  },
Signup: {
  screen: Signup,
  navigationOptions: {
    headerTitle:() => <Header title='SIGNUP'/>,
  }
},
Home: {
  screen: Home,
  navigationOptions: {
    headerTitle:() => <Header title='Crypt Chat'/>,
  }
},
Chat: {
  screen : Chat,
  headerTitle:() => <Header title='Crypt Chat'/>,
}
};

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
