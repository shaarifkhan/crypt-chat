import React from "react";
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
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
const ContactSchema = yup.object({
  username: yup.string().required(),
  email: yup.string(),
  contact: yup.string(),
});

export default function AddContact({ navigation, addcontact, userId }) {
  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Formik
            initialValues={{
              username: "",
              email: "",
              contact: "",
            }}
            validationSchema={ContactSchema}
            onSubmit={(values, actions) => {
              // console.log(values);
              friendId = Math.floor(Math.random() * 1000);
              values["friendId"] = friendId;
              addcontact(values);
              //submitToserver(values);
              navigation.navigate("Home");
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
                  placeholder=" Full name"
                  onChangeText={props.handleChange("username")}
                  onBlur={props.handleBlur("username")}
                  value={props.values.username}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.username && props.errors.username}
                </Text>

                <Input
                  leftIcon={
                    <Icon
                      name="envelope"
                      size={24}
                      color="black"
                      style={styles.margin}
                    />
                  }
                  style={globalStyles.input}
                  placeholder=" Email"
                  onChangeText={props.handleChange("email")}
                  onBlur={props.handleBlur("email")}
                  value={props.values.rating}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.email && props.errors.email}
                </Text>
                <Input
                  keyboardType="numeric"
                  leftIcon={
                    <Icon
                      name="book"
                      size={24}
                      color="black"
                      style={styles.margin}
                    />
                  }
                  style={globalStyles.input}
                  placeholder=" Contact Number"
                  onChangeText={props.handleChange("contact")}
                  onBlur={props.handleBlur("contact")}
                  value={props.values.password}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.contact && props.errors.contact}
                </Text>

                <Button
                  buttonStyle={{
                    backgroundColor: "#43484d",
                  }}
                  title="Add"
                  onPress={props.handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
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
    fontSize: 55,
    marginTop: 50,
    marginLeft: 45,
    justifyContent: "center",
  },
  margin: {
    marginRight: 10,
  },
});
