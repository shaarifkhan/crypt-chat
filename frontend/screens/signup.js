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
const reviewSchema = yup.object({
  username: yup.string().required().min(4),
  fullname: yup.string().required().min(8),
  password: yup.string().required().min(8),
  email: yup.string().required().min(8),
});
const submitToServer = (userId, values) => {
  Axios.post("http://192.168.43.42:3000");
};

export default function Signup({ navigation }) {
  const [error, setError] = useState(null);
  handleSubmit = (values) => {
    const { email, password } = values;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("signed up");
        submitToServer(user.uid, values);
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
            fullname: "",
            email: "",
            password: "",
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
                leftIcon={<Icon name="user" size={24} color="black" />}
                style={globalStyles.input}
                placeholder="Username"
                onChangeText={props.handleChange("username")}
                onBlur={props.handleBlur("username")}
                value={props.values.username}
              />
              {/* only if the left value is a valid string, will the right value be displayed */}
              <Text style={globalStyles.errorText}>
                {props.touched.username && props.errors.username}
              </Text>

              <Input
                leftIcon={<Icon name="book" size={24} color="black" />}
                style={globalStyles.input}
                placeholder="Fullname"
                onChangeText={props.handleChange("fullname")}
                onBlur={props.handleBlur("fullname")}
                value={props.values.fullname}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.fullname && props.errors.fullname}
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
              <Input
                leftIcon={<Icon name="envelope" size={24} color="black" />}
                style={globalStyles.input}
                placeholder="email"
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
                value={props.values.rating}
                //keyboardType='numeric'
              />
              <Text style={globalStyles.errorText}>
                {props.touched.email && props.errors.email}
              </Text>

              <Button
                color="maroon"
                title="Submit"
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}
