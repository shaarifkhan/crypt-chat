import React from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
axios.defaults.withCredentials = true;

const reviewSchema = yup.object({
  email: yup.string().required(),

  password: yup.string().required(),
});

export default function Login({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("Signup");
  };
  const submitToserver = (values) => {
    console.log("hello world");
    const { email, password } = values;
    console.log(email, password);
    axios
      .post("http://192.168.1.105:3000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            submitToserver(values);
            console.log(values);
          }}
        >
          {(props) => (
            <View>
              <TextInput
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

              <TextInput
                style={globalStyles.input}
                placeholder="Password"
                onChangeText={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
                value={props.values.password}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.password && props.errors.password}
              </Text>

              <Button
                color="maroon"
                title="Submit"
                onPress={props.handleSubmit}
              />
              <Text style={globalStyles.titleText}>
                If Don't Have an Acoount so
              </Text>
              <Button
                color="maroon"
                title="Register Now"
                onPress={pressHandler}
              />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}
