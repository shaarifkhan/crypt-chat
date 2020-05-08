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

export default function Chat({ navigation }) {
  <Header title={navigation.getParam("name")} />;
  const handlepress = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        navigation.navigate("Login");
        console.log("Logged out");
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
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <Text style={styles.titleText}>Are you sure you want to logout?</Text>
        <Button
          buttonStyle={{
            marginTop: 30,
            backgroundColor: "coral",
          }}
          title="Log Out"
          onPress={handlepress}
        />
      </View>
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
