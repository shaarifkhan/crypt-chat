import React from "react";
import {
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import Home from "../screens/Home";
import Profile from "../screens/profile";
import { AppStack } from "./homeStack";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "../config/firebase";
import TabNavigator from "./tabNavigator";

const handleLogout = (navigation) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("Logged out");
      navigation.navigate("Auth");
    })
    .catch(function (err) {
      Alert.alert(
        "Error",
        "Something Went Wrong",
        [
          {
            text: "Retry",
            onPress: () => {
              handleLogout();
            },
          },
        ],
        { cancelable: false }
      );
    });
};
const customContentComponent = (props) => (
  <SafeAreaView
    style={{ flex: 1, height: "100%", backgroundColor: "#43484d" }}
    forceInset={{ top: "always", horizontal: "never" }}
  >
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <Image
        source={require("../assets/signature.png")}
        style={{ width: "70%" }}
        resizeMode="contain"
      />
    </View>
    <View style={{ marginLeft: 20, marginTop: 0 }}>
      <DrawerNavigatorItems {...props} />
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "Log out",
            "Do you want to logout?",
            [
              {
                text: "Cancel",
                onPress: () => {
                  props.navigation.closeDrawer();
                },
              },
              {
                text: "Confirm",
                onPress: () => {
                  console.log("logout");
                  handleLogout(props.navigation);
                },
              },
            ],
            { cancelable: false }
          )
        }
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const WINDOW_WIDTH = Dimensions.get("window").width;

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppStack,
    },
    // Logout: {
    //   screen: Logout,
    // },
    Profile: {
      screen: Profile,
    },
  },
  {
    contentOptions: {
      activeTintColor: "#548ff7",
      activeBackgroundColor: "transparent",
      inactiveTintColor: "#ffffff",
      inactiveBackgroundColor: "transparent",
      backgroundColor: "#43484d",
      labelStyle: {
        fontSize: 17,
        marginLeft: 10,
        marginTop: 20,
      },
    },
    drawerWidth: Math.min(WINDOW_WIDTH * 0.8, 300),
    contentComponent: customContentComponent,
  },
  {
    unmountInactiveRoutes: true,
  }
  //   { contentComponent: Signout }
);
export default DrawerNavigator;
