import AutoScrollFlatList from "react-native-autoscroll-flatlist";
import KeyboardSpacer from "react-native-keyboard-spacer";
import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  RefreshControl,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const { baseUrl } = require("../config/dev-config.json");
import axios from "axios";
import { getIdToken } from "../commons/index";
import firebase from "../config/firebase";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
axios.defaults.withCredentials = true;

// const io = require("socket.io-client");
// const socket = io(baseUrl, { forceNode: true });

export default function Conversation({ navigation }) {
  const { socket, contact } = navigation.state.params;
  console.log("in conversation contact is ", contact);
  const [spinner, setSpinner] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState([
    {
      id: 8,
      date: "9:50 am",
      type: "in",
      message: "Lorem ipsum dolor sit a met",
    },
    {
      id: 9,
      date: "9:50 am",
      type: "in",
      message: "Lorem ipsum dolor sit a met",
    },
  ]);

  const [message, setMessage] = useState("");
  const renderDate = (date) => {
    return <Text style={styles.time}>{date}</Text>;
  };

  //when the socket connect with the chat
  //   socket.on("connect", () => {
  //     socket.emit("join", roomId);
  //     socket.on("addMessage", (msg) => {
  //       // console.log("addMessage call hoa he");
  //       setData((previousData) => [
  //         ...previousData,
  //         {
  //           id: Math.floor(Math.random(10000) * Math.floor(10000)),
  //           data: "9:50 am",
  //           type: "in",
  //           message: msg,
  //         },
  //       ]);
  //     });
  //   });

  const handleSubmit = () => {
    getIdToken().then((token) => {
      console.log("first");
      axios.defaults.headers.common["Authorization"] = token;
      console.log(token);

      axios
        .post(baseUrl + "/secured/postmessage", {
          message: message,
          receiverId: contact._id,
        })
        .then(({ data }) => {})
        .catch((err) => {
          console.log("post message mn error aa gaya", err);
          throw err;
        });
    });
    setData((previousData) => [
      ...previousData,
      {
        id: Math.floor(Math.random(10000) * Math.floor(10000)),
        data: "9:50 am",
        type: "out",
        message: message,
      },
    ]);
    setMessage("");
  };
  const getMessages = () => {
    getIdToken().then((token) => {
      console.log("first");
      axios.defaults.headers.common["Authorization"] = token;
      console.log(token);
      axios
        .get(baseUrl + `/secured/getmessages?partnerId=${contact._id}`)
        .then(({ data }) => {
          const result = data.result;
          // console.log(result);
          for (i = 0; i < result.length; i++) {
            console.log(result[i]);
            const body = {
              id: result[i]._id,
              message: result[i].message,
              type: result[i].currentUserIsSender ? "out" : "in",
              date: moment(result[i].dateTime).format("DD/MM/YYYY hh:mm a"),
            };

            setData((oldMessages) => [...oldMessages, body]);
            setSpinner(false);
          }
          console.log("data is", data);
        })
        .catch((err) => {
          console.log("yhi par error aa gaya", err);
          throw err;
        });
    });
  };

  //on every component did mount
  useEffect(() => {
    let isSubscribed = true;

    setSpinner(true);
    if (isSubscribed)
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          getMessages();
        }
      });

    return () => (isSubscribed = false);
  }, []);

  // pull to refresh component
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getContact();

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);
  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
        animation="slide"
      />
      <AutoScrollFlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        renderItem={(message) => {
          const item = message.item;
          // console.log(item);
          let inMessage = item.type === "in";
          let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
          return (
            <React.Fragment>
              <View style={[styles.item, itemStyle]}>
                {/* {!inMessage && renderDate(item.date)} */}
                <View style={[styles.balloon]}>
                  <Text>{item.message}</Text>
                </View>
              </View>
              <View style={itemStyle}>
                <Text> {renderDate(item.date)}</Text>
              </View>
            </React.Fragment>
          );
        }}
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Write a message..."
            underlineColorAndroid="transparent"
            onChangeText={(message) => setMessage(message)}
            defaultValue={message}
          />
        </View>

        <TouchableOpacity style={styles.btnSend} onPress={() => handleSubmit()}>
          <Image
            source={{
              uri: "https://img.icons8.com/color/48/000000/filled-sent.png",
            }}
            style={styles.iconSend}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#eeeeee",
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: "#00BFFF",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: "flex-start",
  },
  itemOut: {
    alignSelf: "flex-end",
  },
  time: {
    alignSelf: "flex-end",
    margin: 15,
    fontSize: 12,
    color: "#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    borderRadius: 300,
    padding: 5,
  },
});
