import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import Signup from '../screens/singup';
import Login from '../screens/login';
//import Signup from '../screens/signup';

const screens = {
 
  
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    }
  },
  

Signup: {
  screen: Signup,
  navigationOptions: {
    title: 'Signup',
  }
},
};

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
