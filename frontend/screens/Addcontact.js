import React from 'react';
import { StyleSheet, TextInput, View, Text ,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button} from 'react-native-elements';
import Header from '../shared/header';

const ContactSchema = yup.object({
    name: yup.string()
        .required(),
    email: yup.string(),
    contact: yup.string()
});

export default function Contact({ navigation ,addcontact}) {
    const submitToserver = (values) => {
    console.log("hello world");
    const { name, email, contact } = values;
    axios.post("http://192.168.1.105:3000/register", {
        name: name,
        email: email,
        contact: contact,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    return(
        <View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Formik
            initialValues={{
                name: "",
                email: "",
                contact: "",
            }}
            validationSchema={ContactSchema}
            onSubmit={(values, actions) => {
                console.log(values);
                addcontact(values)
                //submitToserver(values);
                navigation.navigate("Home");
            }}
            >
            {(props) => (
                <View>
                    <Input
                        leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />}
              style={globalStyles.input} 
              placeholder=' Full name'
              onChangeText={props.handleChange('name')}
              onBlur={props.handleBlur('name')}
              value={props.values.name}
                />
                <Text style={globalStyles.errorText}>{props.touched.name && props.errors.name}</Text> 

                    <Input 
                        leftIcon={
                        <Icon
                            name='envelope'
                            size={24}
                            color='black'
                        />}
                    style={globalStyles.input}
                    placeholder=' Email'
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')} 
                    value={props.values.rating}
                    />
                <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>
                    <Input
                        leftIcon={
                        <Icon
                            name='book'
                            size={24}
                            color='black'
                        />}
                    style={globalStyles.input}
                    placeholder=' Contact Number'
                    onChangeText={props.handleChange('contact')}
                    onBlur={props.handleBlur('contact')}
                    value={props.values.password}
                    />
                <Text style={globalStyles.errorText}>{props.touched.contact && props.errors.contact}</Text>
            
                <Button color='maroon' title="Add" onPress={props.handleSubmit} /> 
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
      marginTop: 20,   
      padding: 10,
      justifyContent: 'center' 
    },
    titleText:{
        fontSize: 55,
        marginTop:50,
        marginLeft:45,
        justifyContent: 'center'
    }

})