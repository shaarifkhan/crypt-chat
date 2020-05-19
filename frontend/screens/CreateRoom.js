import React from "react";
import {
  StyleSheet,
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
const createRoomSchema = yup.object({
  title: yup.string().required(),
});

export default function CreateRoom({ navigation, createRoom }) {
  //const createRoom= navigation.params.createRoom()

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Formik
            initialValues={{
              title: "",
            }}
            validationSchema={createRoomSchema}
            onSubmit={(values, actions) => {
              values["_id"] = Math.floor(Math.random() * 1000);
              console.log(values);

              createRoom(values);
              //submitToserver(values);
              navigation.navigate("Room");
            }}
          >
            {(props) => (
              <View>
                <Input
                  leftIcon={<Icon title="user" size={24} color="black" />}
                  style={globalStyles.input}
                  placeholder=" Room Name"
                  onChangeText={props.handleChange("title")}
                  onBlur={props.handleBlur("title")}
                  value={props.values.title}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.title && props.errors.title}
                </Text>

                <Button
                  buttonStyle={{
                    backgroundColor: "coral",
                  }}
                  title="Create Room"
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
});
