import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/header";
import Home from "../screens/Home";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Chat from "../screens/Chat";
import Room from "../screens/Room";
import Addcontact from "../screens/Addcontact";
import Login2 from "../screens/login2";
import Conversation from "../screens/conversation";
import Subheader from "../shared/Subheader";
import ImagePickerExample from "../screens/imagePicker";
const AppScreens = {
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
          <Subheader title="Conversation" navigation={navigation} />
        ),
      };
    },
  },
  ImagePicker: {
    screen: ImagePickerExample,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Subheader title="CameraRoll" navigation={navigation} />
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
const AuthScreens = {
  Login: {
    screen: Login,
  },

  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Subheader title="Signup" navigation={navigation} />,
      };
    },
  },
};
// home stack navigator screens
const AppStack = createStackNavigator(AppScreens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#00868B", height: 80 },
  },
});
const AuthStack = createStackNavigator(AuthScreens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#00868B", height: 80 },
  },
});

export { AppStack, AuthStack };
