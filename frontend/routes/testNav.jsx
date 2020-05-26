// import * as React from "react";
// import {
//   ActivityIndicator,
//   Button,
//   StatusBar,
//   StyleSheet,
//   View,
//   AsyncStorage,
//   Text,
// } from "react-native";

// import { createSwitchNavigator, createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import { createDrawerNavigator } from "react-navigation-drawer";
// import { createMaterialTopTabNavigator } from "react-navigation-tabs";
// import TabNavigator from "./test";

// class SignInScreen extends React.Component {
//   static navigationOptions = {
//     title: "Please sign in",
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Sign in!" onPress={this._signInAsync} />
//       </View>
//     );
//   }

//   _signInAsync = async () => {
//     await AsyncStorage.setItem("userToken", "abc");
//     this.props.navigation.navigate("App");
//   };
// }

// class Contact extends React.Component {
//   static navigationOptions = {
//     title: "Welcome to the app!",
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>This is a contact screen</Text>
//       </View>
//     );
//   }

//   _showMoreApp = () => {
//     this.props.navigation.navigate("Other");
//   };

//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate("Auth");
//   };
// }
// class Chat extends React.Component {
//   static navigationOptions = {
//     title: "Chat",
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>this is a chat screen</Text>
//       </View>
//     );
//   }
// }
// class Conversation extends React.Component {
//   static navigationOptions = {
//     title: "Welcome to the RN!",
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Go to chat" onPress={this._showMoreApp} />
//       </View>
//     );
//   }

//   _showMoreApp = () => {
//     console.log("we got here");
//     this.props.navigation.navigate("Chatty");
//   };
// }

// class AuthLoadingScreen extends React.Component {
//   constructor() {
//     super();
//     this._bootstrapAsync();
//   }

//   // Fetch the token from storage then navigate to our appropriate place
//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem("userToken");

//     // This will switch to the App screen or Auth screen and this loading
//     // screen will be unmounted and thrown away.
//     this.props.navigation.navigate(userToken ? "App" : "Auth");
//   };

//   // Render any loading content that you like here
//   render() {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// const ConvoStack = createStackNavigator({
//   Conversation: {
//     screen: Conversation,
//   },

//   Chat: {
//     screen: Chat,
//   },
// });
// ConvoStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }
// };
// const TabNavigator = createMaterialTopTabNavigator({
//   Conversation: {
//     screen: Conversation,
//     navigationOptions: {
//       tabBarLabel: "Conversation",
//       initialRouteName: "Home",
//       activeColor: "#C71585",
//       inactiveColor: "#226557",
//       barStyle: { backgroundColor: "black" },
//     },
//   },
//   Contact: {
//     screen: Contact,
//     navigationOptions: {
//       tabBarLabel: "Contacts",

//       activeColor: "#4B0082",
//       inactiveColor: "#226557",
//       barStyle: { backgroundColor: "black" },
//     },
//   },
// });
// const AppStack = createStackNavigator({
//   Tabs: TabNavigator,
//   Chatty: Chat,
// });
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });
// const DrawerNavigator = createDrawerNavigator({
//   Contact: {
//     screen: AppStack,
//   },
// });
// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       AuthLoading: AuthLoadingScreen,
//       Auth: AuthStack,
//       App: DrawerNavigator,
//     },
//     {
//       initialRouteName: "AuthLoading",
//     }
//   )
// );
