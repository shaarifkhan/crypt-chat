import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import AppStack from "./homeStack";
// import AuthStack from "./homeStack";
import AuthLoadingScreen from "../screens/AuthLoading";
import { AppStack, AuthStack } from "./homeStack";
import Home from "../screens/Home";
import DrawerNavigator from "./drawer";

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: DrawerNavigator,
    },
    {
      initialRouteName: "AuthLoading",
    }
  )
);
