import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Alert,
} from "react-native";
import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import * as yup from "yup";
import Icon from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator } from "react-native";
import Header from "../shared/header";
import { Input, Button } from "react-native-elements";
import firebase from "../config/firebase";
import { StackActions, NavigationActions } from "react-navigation";

export default function Signout({ navigation }) {
  // <Header title={navigation.getParam("name")} />;
  const handlepress = () => {
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
                handlepress();
              },
            },
          ],
          { cancelable: false }
        );
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <SideMenu {...props} />
      <DrawerItems {...props} />
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "Log out",
            "Do you want to logout?",
            [
              {
                text: "Cancel",
                onPress: () => {
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());
                },
              },
              {
                text: "Confirm",
                onPress: () => {
                  console.log("logout");
                  // props.navigation.navigate("LoginScreen");
                },
              },
            ],
            { cancelable: false }
          )
        }
      >
        <Text style={{ margin: 16, fontWeight: "bold", color: "red" }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 10,
    justifyContent: "center",
  },
  titleText: {
    marginTop: 100,
    fontSize: 20,
  },
  innercontainer: {
    marginTop: 70,
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 50,
    width: 250,
  },
});
