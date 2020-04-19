import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import Signup from '../screens/signup';
import Login from '../screens/login';
import Header from '../shared/header';

const screens = {
 
  
  Login: {
    screen: Login,
    navigationOptions: {
      //title: 'Login',
      headerTitle:() => <Header title='LOGIN'/>,
    }
  },
  

Signup: {
  screen: Signup,
  navigationOptions: {
    //title: 'Login',
    headerTitle:() => <Header title='SIGNUP'/>,
  }
},
};

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
