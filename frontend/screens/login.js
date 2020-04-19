import React, { useState } from "react";
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

import { Input, Button } from "react-native-elements";

const reviewSchema = yup.object({
  email: yup.string().required(),

  password: yup.string().required(),
});

export default function Login({ navigation }) {
  const [error, setError] = useState(null);
  const [actions, setActions] = useState(null);
  const pressHandler = () => {
    navigation.navigate("Signup");
  };
  const handleLogin = (values) => {
    const { email, password } = values;
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then((user) => {
        console.log("signed in");
      })
      .catch((err) => {
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
            console.log(values);
          }}
        >
          {(props) => (
            <View>
              <Input
                leftIcon={<Icon name="user" size={24} color="black" />}
                style={globalStyles.input}
                placeholder="Username"
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
                value={props.values.email}
              />
              {/* only if the left value is a valid string, will the right value be displayed */}
              <Text style={globalStyles.errorText}>
                {props.touched.email && props.errors.email}
              </Text>

              <Input
                leftIcon={<Icon name="lock" size={24} color="black" />}
                style={globalStyles.input}
                placeholder="Password"
                onChangeText={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
                value={props.values.password}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.password && props.errors.password}
              </Text>

              <Button title="LOGIN" onPress={props.handleSubmit} />

              <Text style={styles.nT}>Don't Have an Account? Signup</Text>
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
});
