import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AuthLoadingScreen from "../screens/AuthLoading";
import { AppStack, AuthStack } from "./homeStack";
import DrawerNavigator from "./drawer";

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
