import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from "react-native";
import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import * as yup from "yup";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator } from 'react-native';
import { Input,Button } from 'react-native-elements';
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
    <Image
  source={require('../assets/cc.png')} style={styles.img}/>
      <Formik
        initialValues={{ username: '',password:'' }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          //addReview(values);
          console.log(values)
        }}
      >
        {props => (
          <View>
            <Input
              leftIcon={
                <Icon
                  name='user'
                  size={24}
                  color='black'
                />
              }
              style={globalStyles.input}
              placeholder='Username'
              onChangeText={props.handleChange('username')}
              onBlur={props.handleBlur('username')} 
              value={props.values.username}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.username && props.errors.username}</Text>
            <Input
              leftIcon={
                <Icon
                  name='lock'
                  size={24}
                  color='black'
                />
              }
              style={globalStyles.input}
              
              placeholder='Password'
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              value={props.values.password}
            />
            <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>
            
            <Button color='maroon' title="LOGIN" onPress={()=>navigation.navigate("Home")} /> 
             
             <Text style={styles.nT}>Don't Have an Acount</Text>
             <View style={styles.nB}>
            <Button color='maroon' title="Register Now" type="clear" onPress={pressHandler} /> 
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
    fontWeight: 'bold',
    color: '#333',
    alignItems:'center',
    marginLeft:70,
    marginTop: 20,    
  },
  nB:{
    marginTop: 5,
  }
});

