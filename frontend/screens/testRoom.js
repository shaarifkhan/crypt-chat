import React, { useState, useEffect } from "react";
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
import Header from "../shared/header";
import { MaterialIcons } from "@expo/vector-icons";
import CreateRoom from "./CreateRoom";
import Icon from "react-native-vector-icons/FontAwesome";
import MakeGroup from "./MakeGroup";
import firebase from "../config/firebase";

import Axios from "axios";
const baseUrl = "http://192.168.1.105:3000";
const socket = require("socket.io-client")(baseUrl + "/rooms", {
  forceNew: true,
  forceNode: true,
});

export default function Room({ navigation }) {
  const [userId, setUserId] = useState(null);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [rooms, setRooms] = useState([
    {
      _id: 11,
      title: "Politics",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
  ]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user.uid);
        const socket = io(baseUrl + "/rooms");

        Axios.get(baseUrl + "/rooms")
          .then((res) => {
            for (i = 0; i < res.data.length; i++) {
              const room = {
                _id: res.data[i]._id,
                title: res.data[i].title,
              };
              room["image"] =
                "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png";
              // console.log(room);
              setRooms((oldRooms) => [room, ...oldRooms]);
            }
          })
          .catch((err) => {
            throw err;
          });
      }
    });
  }, []);

  const openChat = (room) => {
    Axios.get(baseUrl + `/chat/${room._id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createRoom = (roomTitle) => {
    console.log(roomTitle);
    socket.emit("createRoom", roomTitle);
    setRooms((currentcontact) => {
      return [room, ...currentcontact];
    });
    setModal(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={modal} animationType="slide">
        <View style={styles.modalContent}>
          {/* <MaterialIcons
            username="close"
            size={24}
            style={{ ...styles.modalToggle, ...styles.modalClose}}
            onPress= {()=>setModal(false)}
          /> */}
          <View style={styles.addoption}></View>
          <AddContact createRoom={createRoom} navigation={navigation} />
        </View>
      </Modal>

      <Modal visible={modal1} animationType="slide">
        <View style={styles.modalContent}>
          <Icon
            name="arrow-circle-right"
            size={28}
            color="white"
            style={{ ...styles.modalToggle, ...styles.modalClose }}
            onPress={() => setModal1(false)}
          ></Icon>
          <MakeGroup contacts={contacts} />
        </View>
      </Modal>

      <TouchableOpacity style={styles.option} onPress={() => setModal(true)}>
        <View style={styles.option}>
          <View style={styles.iconsize}>
            <Icon name="user" size={24} color="white" />
            <Text
              style={styles.optiontxt}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Add A New Contact
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => setModal1(true)}>
        <View style={styles.option}>
          <View style={styles.iconsize}>
            <Icon name="group" size={24} color="white" />
            <Text
              style={styles.optiontxt}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Make A New Room
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <FlatList
        data={rooms}
        keyExtractor={(item) => {
          return item._id ? item._id.toString() : "";
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openChat(item)}>
            <View style={styles.row}>
              <Image source={{ uri: item.image }} style={styles.pic} />
              <View>
                <View style={styles.nameContainer}>
                  <Text
                    style={styles.nameTxt}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.title}
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
  );
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
    backgroundColor: "coral",
  },
  iconsize: {
    flexDirection: "row",
    width: 280,
  },
  option: {
    backgroundColor: "coral",
    padding: 4,
  },
  optiontxt: {
    marginLeft: 15,
    fontWeight: "800",
    color: "white",
    fontSize: 16,
    width: 170,
  },
  addoption: {
    backgroundColor: "coral",
    padding: 30,
  },
  addoptiontxt: {
    marginLeft: 15,
    fontWeight: "800",
    color: "white",
    fontSize: 16,
    width: 170,
  },
  addoptiontxt: {
    marginLeft: 50,
    fontWeight: "800",
    color: "white",
    fontSize: 16,
    width: 170,
  },
});
