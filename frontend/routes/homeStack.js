import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/header";
import Home from "../screens/Home";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Chat from "../screens/Chat";
import Room from "../screens/Room";
import Addcontact from "../screens/Addcontact";
import LoginScreen3 from "../screens/login2";
import Conversation from "../screens/conversation";
const screens = {
  Login: {
    screen: Login,
  },

  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Signup" navigation={navigation} />,
      };
    },
  },
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Contacts" navigation={navigation} />,
      };
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Chat" navigation={navigation} />,
      };
    },
  },
  Conversation: {
    screen: Conversation,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header title="Conversation" navigation={navigation} />
        ),
      };
    },
  },
  Room: {
    screen: Room,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Room" navigation={navigation} />,
      };
    },
  },
  Addcontact: {
    screen: Addcontact,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header title="Add New Contact" navigation={navigation} />
        ),
      };
    },
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "#eee", height: 60 },
  },
});

export default HomeStack;
