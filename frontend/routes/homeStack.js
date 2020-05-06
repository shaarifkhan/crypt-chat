import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import { createAppContainer } from "react-navigation";
import Signup from "../screens/signup";
import Login from "../screens/login";
import Header from "../shared/header";
import Home from "../screens/Home";
import Room from "../screens/Room";
import Chat from "../screens/Chat";
import Addcontact from "../screens/Addcontact";
const screens = {
  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle: () => <Header title="LOGIN" />,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerTitle: () => <Header title="SIGNUP" />,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: () => <Header title="Home" />,
    },
  },
  // Room: {
  //   screen: Room,
  //   headerTitle: () => <Header title="Room" />,
  // },
  Addcontact: {
    screen: Addcontact,
    navigationOptions: {
      headerTitle: () => <Header title="Add New" />,
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      headerTitle: () => <Header title="Chat" />,
    },
  },
};

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
