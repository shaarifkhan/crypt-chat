import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
} from "react-native";
const io = require("socket.io-client");
const { baseUrl } = require("../config/dev-config.json");

const chatSocket = io(baseUrl + "/chatroom", { forceNode: true });

export default function Chat({ navigation }) {
  const { roomId } = navigation.state.params;
  // console.log("roomId", roomId);
  const [data, setData] = useState([
    {
      id: 1,
      date: "9:50 am",
      type: "in",
      message: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      date: "9:50 am",
      type: "out",
      message: "Lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      date: "9:50 am",
      type: "in",
      message: "Lorem ipsum dolor sit a met",
    },
    {
      id: 4,
      date: "9:50 am",
      type: "in",
      message: "Lorem ipsum dolor sit a met",
    },
    {
      id: 5,
      date: "9:50 am",
      type: "out",
      message: "Lorem ipsum dolor sit a met",
    },
    {
      id: 6,
      date: "9:50 am",
      type: "out",
      message: "Lorem ipsum dolor sit a met",
    },
    {
      id: 7,
      date: "9:50 am",
      type: "in",
      message: "Lorem ipsum dolor sit a met",
    },
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
  renderDate = (date) => {
    return <Text style={styles.time}>{date}</Text>;
  };
  //when the socket connect with the chat
  chatSocket.on("connect", () => {
    chatSocket.emit("join", roomId);
    chatSocket.on("addMessage", (msg) => {
      // console.log("addMessage call hoa he");
      setData((previousData) => [
        ...previousData,
        {
          id: Math.floor(Math.random(10000) * Math.floor(10000)),
          data: "9:50 am",
          type: "in",
          message: msg,
        },
      ]);
    });
  });

  handleSubmit = () => {
    chatSocket.emit("newMessage", { roomId, message });
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

  return (
    <View style={styles.container}>
      <FlatList
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
            <View style={[styles.item, itemStyle]}>
              {!inMessage && renderDate(item.date)}
              <View style={[styles.balloon]}>
                <Text>{item.message}</Text>
              </View>
              {inMessage && renderDate(item.date)}
            </View>
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
    </View>
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
