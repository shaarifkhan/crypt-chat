import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import React from "react";
import Header from "../shared/header";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Subheader from "../shared/Subheader";
import FlatListDemo from "../screens/FindContact";
import Contacts from "../screens/Contacts";
import Chat from "../screens/Chat";
import Conversation from "../screens/Conversations";

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
    headerStyle: { backgroundColor: "#00868B", height: 70 },
  },
};

const TabNavigator = createMaterialTopTabNavigator(
  {
    Chat: {
      screen: Conversation,
      navigationOptions: {
        tabBarLabel: "Chat",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={30}
              name={"ios-chatboxes"}
            />
          </View>
        ),
        activeColor: "#4B0082",
        inactiveColor: "#226557",
        barStyle: { backgroundColor: "black" },
      },
  
    },
    Home: {
      screen: Contacts,
      navigationOptions: {
        tabBarLabel: "Contacts",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={30}
              name={"ios-contacts"}
            />
          </View>
        ),
        // initialRouteName: "Chat",
        activeColor: "#C71585",
        inactiveColor: "#226557",
        barStyle: { backgroundColor: "00868B" },
      },
    },
  },

  {
    initialRouteName: "Chat",

    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      pressColor: "black",
      style: {
        backgroundColor: "white",
      },
      indicatorStyle: {
        backgroundColor: "#00868B",
      },
      // activeTintColor: "#000",
      activeTintColor: "#00868B",
      inactiveTintColor: "#d1cece",
      showLabel: false,
      showIcon: true,
    },
  }
  // {
  //   defaultNavigationOptions: {
  //     headerTintColor: "white",
  //     headerStyle: { backgroundColor: "#00868B", height: 80 },
  //     //   lazy: true,
  //   },
  // }
);

const AppStack = createStackNavigator(
  {
    Main: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => <Header title="Crypt Chat" navigation={navigation} />,
        };
      },

    },
    Convo: {
      screen: Chat,
    },
    FindContact: {
      screen: FlatListDemo,
    },
  },
  headerConfig
);
const AuthStack = createStackNavigator(AuthScreens, headerConfig);

export { AuthStack, AppStack };
