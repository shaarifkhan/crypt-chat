import React from 'react';
import { StyleSheet, Button, TextInput, View, Text ,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';

const reviewSchema = yup.object({
  username: yup.string()
    .required(),
    
  
  password: yup.string()
    .required(),
    
  
});

export default function Login({navigation}) {
  const pressHandler=() =>{
    navigation.navigate('Signup');
  }
  return (
    
    
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={globalStyles.container}>
     
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
              
              placeholder='Password'
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              value={props.values.password}
            />
            <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>
            
            <Button color='maroon' title="Submit" onPress={props.handleSubmit} /> 
              <Text style={globalStyles.titleText}>If Don't Have an Acoount so</Text>
            <Button color='maroon' title="Register Now" onPress={pressHandler} /> 
            
          </View>
        )}
      </Formik>
      </View>
      </TouchableWithoutFeedback>
    
    
  );
}