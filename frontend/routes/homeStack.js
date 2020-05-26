import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import React from "react";
import Header from "../shared/header";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Conversation from "../screens/conversation";
import Subheader from "../shared/Subheader";
import FlatListDemo from "../screens/FindContact";
import Contacts from "../screens/Contacts";

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
const headerConfig = {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#00868B", height: 80 },
  },
};

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Contacts,
      navigationOptions: {
        tabBarLabel: "Contacts",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-chatboxes"}
            />
          </View>
        ),
        initialRouteName: "Contacts",
        activeColor: "#C71585",
        inactiveColor: "#226557",
        barStyle: { backgroundColor: "black" },
      },
    },
    Chat: {
      screen: Login,
      navigationOptions: {
        tabBarLabel: "Chat",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={30}
              name={"ios-contacts"}
            />
          </View>
        ),
        activeColor: "#4B0082",
        inactiveColor: "#226557",
        barStyle: { backgroundColor: "black" },
      },
    },
  },

  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      pressColor: "black",
      style: {
        backgroundColor: "white",
      },
      indicatorStyle: {
        backgroundColor: "black",
      },
      activeTintColor: "#000",
      inactiveTintColor: "#d1cece",
      showLabel: false,
      showIcon: true,
    },
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "white",
      headerStyle: { backgroundColor: "#00868B", height: 80 },
      //   lazy: true,
    },
  }
);

const AppStack = createStackNavigator(
  {
    Main: {
      screen: TabNavigator,
    },
    Convo: {
      screen: Conversation,
    },
    FindContact: {
      screen: FlatListDemo,
    },
  },
  headerConfig
);
const AuthStack = createStackNavigator(AuthScreens, headerConfig);

export { AuthStack, AppStack };
