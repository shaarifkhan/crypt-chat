import React, { useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import firebase from "../config/firebase";

export default function AuthLoadingScreen({ navigation }) {
  const _bootstrapAsync = () => {
    // Fetch the user from firebase
    firebase.auth().onAuthStateChanged((user) => {
      // This will switch to the App screen or Auth screen and this loading
      navigation.navigate(user ? "App" : "Auth");
      // screen will be unmounted and thrown away.
    });
  };
  useEffect(() => {
    _bootstrapAsync();
  }, []);

  return (
    <View style={(styles.container, styles.horizontal)}>
      <ActivityIndicator size="small" color="#00ff00" />
      <StatusBar barStyle="default" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
