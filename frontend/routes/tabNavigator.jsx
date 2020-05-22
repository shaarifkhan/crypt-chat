import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-chatboxes"}
            />
          </View>
        ),
        initialRouteName: "Home",
        activeColor: "#C71585",
        inactiveColor: "#226557",
        barStyle: { backgroundColor: "black" },
      },
    },
    Chat: {
      screen: Home,
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

export default TabNavigator;
