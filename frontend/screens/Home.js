import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from "react-native";
import AddContact from "./Addcontact";
import Icon from "react-native-vector-icons/FontAwesome";
import MakeGroup from "../screens/MakeGroup";
import firebase from "../config/firebase";
import axios from "axios";
import { baseUrl } from "../config/dev-config.json";
import { getIdToken } from "../commons/index";
axios.defaults.withCredentials = true;

export default function Home({ navigation }) {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [userId, setUserId] = useState(null);
  const [contacts, setContacts] = useState([
    {
      _id: 11,
      username: "Imran Khan",
      email: "imran@tatti.com",
      status: "active",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
    {
      _id: 10,
      username: "Taha Farooqui",
      status: "active",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
    // {
    //   _id: 11,
    //   username: "Imran Khan",
    //   status: "active",
    //   image:
    //     "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    // },
  ]);
  const submitToServer = (contact) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("submit to server", contact);
        setUserId(user.uid);
        body = {
          userId: user.uid,
          friendname: contact.username,
        };
        friendId = Math.floor(Math.random() * 1000);
        body["friendId"] = friendId;
        console.log(body);

        axios
          .post(baseUrl + "/postContact", body)
          .then((res) => {
            console.log(res.status);
          })
          .catch((err) => {
            throw err;
          });
      } //else pass;
    });
  };

  const addcontact = (contact) => {
    console.log("here");
    submitToServer(contact);
    contact._id = Math.floor(Math.random() * 1000);
    contact.status = "active";
    contact.image =
      "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png";
    console.log("addcontact", contact);
    setContacts((currentcontact) => {
      return [contact, ...currentcontact];
    });
    setModal2(false);
    setModal(false);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user.uid);
        getIdToken().then((token) => {
          console.log("first");
          axios.defaults.headers.common["Authorization"] = token;
          console.log(token);
          axios
            .get(baseUrl + "/secured/getContact")
            .then((res) => {
              const result = res.data.result;
              // console.log(result);
              for (i = 0; i < result.length; i++) {
                console.log(result[i]);
                result[i]["image"] =
                  "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png";
                setContacts((oldContacts) => [result[i], ...oldContacts]);
              }
            })
            .catch((err) => {
              console.log("yhi par error aa gaya", err);
              throw err;
            });
        });
      }
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={modal} animationType="slide">
        <View style={styles.modalContent}>
          <View style={styles.addoption}>
            <Icon
              name="close"
              size={28}
              color="white"
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModal(false)}
            ></Icon>
          </View>
          <AddContact
            addcontact={addcontact}
            navigation={navigation}
            userId={userId}
          />
        </View>
      </Modal>

      <Modal visible={modal1} animationType="slide">
        <View style={styles.modalContent}>
          <View style={styles.addoption}>
            <Icon
              name="arrow-circle-right"
              size={28}
              color="white"
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModal1(false)}
            ></Icon>
          </View>
          <MakeGroup contacts={contacts} />
        </View>
      </Modal>

      <Modal visible={modal2} animationType="slide">
        <View style={styles.addoption}>
          <Icon
            name="close"
            size={28}
            color="white"
            style={{ ...styles.modalToggle, ...styles.modalClose }}
            onPress={() => setModal2(false)}
          ></Icon>
        </View>
        {/* <TouchableOpacity style={styles.option} onPress={() => setModal(true)}>
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
      </TouchableOpacity> */}
        <View style={styles.storyCounters}>
          <Icon
            name="user"
            style={styles.iconCounter}
            onPress={() => setModal(true)}
          />
          <Text style={styles.iconCounterText}>Add A New Contact</Text>
        </View>

        {/* <TouchableOpacity style={styles.option} onPress={() => setModal1(true)}>
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
      </TouchableOpacity> */}
        <View style={styles.storyCounters}>
          <Icon
            name="users"
            color="coral"
            style={styles.iconCounter}
            onPress={() => setModal1(true)}
          />
          <Text style={styles.iconCounterText}>Add A New Group</Text>
        </View>
      </Modal>

      <FlatList
        data={contacts}
        keyExtractor={(item) => {
          return item._id ? item._id.toString() : "";
        }}
        renderItem={({ item }) => (
          <TouchableOpacity>
            {/* onPress={() => navigation.navigate("Chat", item)} */}
            <View style={styles.row}>
              <Image source={{ uri: item.image }} style={styles.pic} />
              <View>
                <View style={styles.nameContainer}>
                  <Text
                    style={styles.nameTxt}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.username}
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
      <Icon
        name="user-plus"
        size={50}
        color="coral"
        style={styles.fab}
        onPress={() => setModal2(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
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
    padding: 5,
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
  storyCounters: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
  },

  iconCounter: {
    fontSize: 50,
    color: "coral",
    textAlign: "center",
  },

  iconCounterText: {
    color: "black",
    fontSize: 25,
    textAlign: "center",
  },
});
