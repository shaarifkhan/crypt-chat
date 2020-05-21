import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import * as yup from "yup";
import Icon from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator } from "react-native";
import firebase from "../config/firebase";
import { StackActions, NavigationActions } from "react-navigation";
import { Input, Button } from "react-native-elements";
import { baseUrl } from "../config/dev-config.json";
import axios from "axios";
axios.defaults.withCredentials = true;
const io = require("socket.io-client");
const socket = io(baseUrl, { forceNode: true });

const reviewSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export default function Login({ navigation }) {
  console.log(navigation);
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       socket.emit("login", {
  //         uid: user.uid,
  //       });
  //       console.log("ye raha user");
  //       console.log(user.email);
  //       navigation.navigate("Home", { socket: socket });
  //       // navigation.dispatch(resetAction);
  //     } //else pass;
  //   });
  // }, []);

  const [error, setError] = useState(null);
  const [actions, setActions] = useState(null);
  const [isChecking, setChecking] = useState(false);
  const pressHandler = () => {
    setChecking(false);
    navigation.navigate("Signup");
  };
  const handleLogin = (values) => {
    setChecking(true);
    const { email, password } = values;
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(({ user }) => {
        console.log("signed in");
        console.log(user.uid);
        socket.emit("login", {
          uid: user.uid,
        });
        setChecking(false);
        navigation.navigate("App");
      })
      .catch((err) => {
        setChecking(false);

        console.log(err);
        setError(err);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <Image source={require("../assets/cc.png")} style={styles.img} />
        {error &&
          Alert.alert(
            "Login Error",
            "username or password maybe incorrect",
            [
              {
                text: "Retry",
                onPress: () => {
                  actions.resetForm();
                  return setError(null);
                },
              },
            ],
            { cancelable: false }
          )}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {
            setActions(actions);
            actions.resetForm();
            handleLogin(values);
          }}
        >
          {(props) => (
            <View>
              <Input
                leftIcon={
                  <Icon
                    name="user"
                    size={24}
                    color="black"
                    style={styles.margin}
                  />
                }
                style={globalStyles.input}
                placeholder=" Email id"
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
                value={props.values.email}
                autoCapitalize="none"
              />
              {/* only if the left value is a valid string, will the right value be displayed */}
              <Text style={globalStyles.errorText}>
                {props.touched.email && props.errors.email}
              </Text>

              <Input
                secureTextEntry={true}
                leftIcon={
                  <Icon
                    name="lock"
                    size={24}
                    color="black"
                    style={styles.margin}
                  />
                }
                style={globalStyles.input}
                placeholder=" Password"
                onChangeText={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
                value={props.values.password}
                autoCapitalize="none"
              />
              <Text style={globalStyles.errorText}>
                {props.touched.password && props.errors.password}
              </Text>

              <Button
                title="LOGIN"
                loading={isChecking ? true : false}
                style={styles.button}
                onPress={props.handleSubmit}
                buttonStyle={{
                  backgroundColor: "#43484d",
                }}
              />

              <Text style={styles.nT}>Don't Have an Account?</Text>
              <View style={styles.nB}>
                <Button
                  title="Register Now"
                  type="clear"
                  onPress={pressHandler}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  nT: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    alignItems: "center",
    marginLeft: 70,
    marginTop: 20,
  },
  nB: {
    marginTop: 5,
  },
  button: {
    backgroundColor: "coral",
  },
  margin: {
    marginRight: 10,
  },
});
