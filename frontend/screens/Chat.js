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
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator } from 'react-native';
import Header from '../shared/header'
import { Input,Button } from 'react-native-elements';

export default function Chat ({navigation}) {
  <Header title= {navigation.getParam('name')} />
  return(
      <View style={{ flex: 1 }} >
          <Text>{navigation.getParam('name')}</Text>
      </View>
  )
}
const styles= StyleSheet.create({
  container: {
      padding:10
  }
})