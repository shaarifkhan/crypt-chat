import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Modal,
    Button,
} from "react-native";
import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import * as yup from "yup";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator } from 'react-native';
import Header from '../shared/header'

export default function MakeGroup ({navigation,contacts}) {
  return(
      <View style={{ flex: 1 }} >
      <Icon.Button
        name="check"
        style={styles.iconsize}
        backgroundColor="#3b5998"
        onPress={()=>setModal1(true)}>
        Tap on the members to select
        </Icon.Button>
      <FlatList
        data={contacts}
        keyExtractor={(item) => {
          return item.id ? item.id.toString() : "";
        }}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.row}>
              <Image source={{ uri: item.image }} style={styles.pic} />
              <View>
                <View style={styles.nameContainer}>
                  <Text
                    style={styles.nameTxt}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.mblTxt}>Mobile</Text>
                </View>
                <View style={styles.msgContainer}>
                  <Text style={styles.msgTxt}>{item.status}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
          />
      </View>
  )
}
const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: "#DCDCDC",
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      padding: 10,
    },
    pic: {
      borderRadius: 30,
      width: 60,
      height: 60,
    },
    nameContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: 280,
    },
    nameTxt: {
      marginLeft: 15,
      fontWeight: "800",
      color: "#222",
      fontSize: 16,
      width: 170,
    },
    mblTxt: {
      fontWeight: "200",
      color: "#777",
      fontSize: 13,
    },
    msgContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    msgTxt: {
      fontWeight: "400",
      color: "#008B8B",
      fontSize: 12,
      marginLeft: 15,
    },
    modalToggle: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#f2f2f2",
      padding: 10,
      borderRadius: 10,
      alignSelf: "center",
    },
    modalToggle1: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      borderWidth: 2,
      borderColor: "#f2f2f2",
      padding: 20,
      borderRadius: 20,
      alignSelf: "center",
    },
    modalClose: {
      marginTop: 20,
      marginBottom: 0,
    },
    modalContent: {
      flex: 1,
    },
    iconsize: {
      padding:15,
      flex:1,
      borderTopEndRadius:4,
      marginBottom:3,
      marginTop:4,
    }
  });