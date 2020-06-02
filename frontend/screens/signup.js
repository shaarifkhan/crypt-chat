import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import * as yup from "yup";
import firebase from "../config/firebase";

import { ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import Header from "../shared/header";
import Axios from "axios";
import { baseUrl } from "../config/dev-config.json";

Axios.defaults.withCredentials = true;

const reviewSchema = yup.object({
  username: yup.string().required().min(4),
  email: yup.string().required().min(8),
  password: yup.string().required().min(8),
  confPassword: yup.string().required().min(8),
});
const submitToServer = (userId, values) => {
  userData = {
    userId: userId,
    username: values.username,
    email: values.email,
  };
  console.log(userData);
  Axios.post(baseUrl + "/register", userData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw err;
    });
};

export default function Signup({ navigation }) {
  const [error, setError] = useState(null);
  const handleSubmit = (values) => {
    const { email, password } = values;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("signed up");
        console.log(res.user.uid);
        submitToServer(res.user.uid, values);
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confPassword: "",
          }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            //addReview(values);
            console.log(values);
            console.log("submit hojana chahiye");
            handleSubmit(values);
          }}
        >
          {(props) => (
            <View>

              <Input
                leftIcon={<Icon name="user" size={24} color="black" style={styles.margin} />}
                style={globalStyles.input}
                placeholder="Username"
                onChangeText={props.handleChange("username")}
                onBlur={props.handleBlur("username")}
                value={props.values.username}
                autoCapitalize = 'none'
              />
              {/* only if the left value is a valid string, will the right value be displayed */}
              <Text style={globalStyles.errorText}>
                {props.touched.username && props.errors.username}
              </Text>

              <Input
                secureTextEntry={true}
                leftIcon={<Icon name="lock" size={24} color="black" style={styles.margin} />}
                style={globalStyles.input}
                placeholder="Password"
                onChangeText={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
                value={props.values.password}
                autoCapitalize = 'none'
              />
              <Text style={globalStyles.errorText}>
                {props.touched.password && props.errors.password}
              </Text>

              <Input
                secureTextEntry={true}
                leftIcon={<Icon name="lock" size={24} color="black" style={styles.margin} />}
                style={globalStyles.input}
                placeholder="Confirm Password"
                onChangeText={props.handleChange("confPassword")}
                onBlur={props.handleBlur("confPassword")}
                value={props.values.confPassword}
                autoCapitalize = 'none'
              />
              <Text style={globalStyles.errorText}>
                {props.touched.confPassword && props.errors.confPassword}
              </Text>

              <Input
                leftIcon={<Icon name="envelope" size={24} color="black" style={styles.margin} />}
                style={globalStyles.input}
                placeholder="email"
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
                value={props.values.rating}
                autoCapitalize="none"
                //keyboardType='numeric'
              />
              <Text style={globalStyles.errorText}>
                {props.touched.email && props.errors.email}
              </Text>

              <Button
              buttonStyle={{
                  backgroundColor: "#43484d",
                }}
                title="Signup"
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 10,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 55,
    marginTop: 50,
    marginLeft: 45,
    justifyContent: "center",
  },
  margin:{
    marginRight:10
  }
});