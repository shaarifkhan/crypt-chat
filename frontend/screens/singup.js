import React from 'react';
import { StyleSheet, Button, TextInput, View, Text ,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';

const reviewSchema = yup.object({
  username: yup.string()
    .required()
    .min(4),
  fullname: yup.string()
    .required()
    .min(8),
  password: yup.string()
    .required()
    .min(8),
  email: yup.string()
    .required()
    .min(8),
});

export default function Signup({navigation}) {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={globalStyles.container}>
     
      <Formik
        initialValues={{ username: '', fullname: '', email: '',password:'' }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          //addReview(values);
          console.log(values)
          navigation.navigate('Login')
        }}
      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Username'
              onChangeText={props.handleChange('username')}
              onBlur={props.handleBlur('username')} 
              value={props.values.username}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.username && props.errors.username}</Text>

            <TextInput
              style={globalStyles.input}
              
              placeholder='Fullname'
              onChangeText={props.handleChange('fullname')}
              onBlur={props.handleBlur('fullname')}
              value={props.values.fullname}
            />
            <Text style={globalStyles.errorText}>{props.touched.fullname && props.errors.fullname}</Text>
            <TextInput
              style={globalStyles.input}
              
              placeholder='Password'
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              value={props.values.password}
            />
            <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>
            <TextInput 
              style={globalStyles.input}
              placeholder='email'
              onChangeText={props.handleChange('email')}
              onBlur={props.handleBlur('email')} 
              value={props.values.rating}
              //keyboardType='numeric'
            />
            <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>
            
            <Button color='maroon' title="Submit" onPress={props.handleSubmit} /> 
            
          </View>
        )}
      </Formik>
      </View>
      </TouchableWithoutFeedback>
    
    
  );
}