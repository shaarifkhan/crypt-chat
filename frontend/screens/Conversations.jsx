import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  RefreshControl,
  AppState,
} from "react-native";
import AddContact from "./Addcontact";
import Icon from "react-native-vector-icons/FontAwesome";
import MakeGroup from "./MakeGroup";
import firebase from "../config/firebase";
import axios from "axios";
import { baseUrl } from "../config/dev-config.json";
import { getIdToken, decryptData } from "../commons/index";
import Spinner from "react-native-loading-spinner-overlay";
const io = require("socket.io-client");
const socket = io(baseUrl, { forceNode: true });
axios.defaults.withCredentials = true;

export default function Conversation({ navigation }) {
  // const { socket } = navigation.state.params;
  console.log("in Conversation is ", socket.id);
  // const [appState, setAppState] = useState(AppState.currentState);

  const [spinner, setSpinner] = useState(false);
  const [userId, setUserId] = useState("false");
  const [refreshing, setRefreshing] = useState(false);
  const [socketState, setSocketState] = useState(false);

  const [contacts, setContacts] = useState([
    {
      _id: 11,
      username: "Imran Khan",
      message: "active",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
  ]);

  const getConversations = () => {
    // console.log("in Conversation is ", socket.id);

    let isSubscribed = true;
    setContacts([]);
    getIdToken().then((token) => {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get(baseUrl + "/secured/getConversations")
        .then((res) => {
          const result = res.data.result;
          // console.log(result);
          for (i = 0; i < result.length; i++) {
            user = result[i];
            // console.log("in Conversation user is\n", user);
            if (user.messages.length == 0) continue;
            var imageLink;
            if (user.partnerId.image) imageLink = user.partnerId.image;
            else
              imageLink =
                "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png";
            const body = {
              _id: user.partnerId._id,
              image: imageLink,
              username: user.partnerId.username,
              message: decryptData(user.messages[0].message),
              email: user.partnerId.email,
            };

            if (isSubscribed) {
              setContacts((oldContacts) => [body, ...oldContacts]);
            }
          }
          setSpinner(false);
          isSubscribed = false;
        })
        .catch((err) => {
          console.log("yhi par error aa gaya", err);
          throw err;
        });
    });
  };

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    let isSubscribed = true;

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user has joined socket");
        socket.emit("login", {
          uid: user.uid,
        });
        if (isSubscribed) {
          // console.log("in Conversation is ", socket.id);

          getConversations();
        }
      }
    });

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
      isSubscribed = false;
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(nextAppState);
        if (nextAppState == "active") {
          socket.emit("login", {
            uid: user.uid,
          });
        }
        if (nextAppState == "background") {
          socket.emit("leaveRoom", {
            uid: user.uid,
          });
        }
        console.log(socket.id);
      }
    });

    // if (appState.match(/inactive|background/) && nextAppState === "active") {
    //   console.log("App has come to the foreground!");
    // }
    // setAppState(nextAppState);
  };

  const openChat = (contact) => {
    // navigation.navigate("Conversation", { contact: contact, socket: socket });
    navigation.navigate("Conversation", { contact: contact, socket: socket });
  };
  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getConversations();

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View style={{ flex: 1, backgroundColor: "#43484d" }}>
      {/* <Spinner
        visible={spinner}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
        animation="slide"
      /> */}

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={contacts}
        keyExtractor={(item) => {
          return item._id ? item._id.toString() : "";
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openChat(item)}>
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
                  <Text style={styles.msgTxt}>{item.message}</Text>
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
    backgroundColor: "#43484d",
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
    color: "white",
    fontSize: 16,
    width: 170,
  },
  mblTxt: {
    fontWeight: "200",
    color: "white",
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
    backgroundColor: "#00868B",
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
  spinnerTextStyle: {
    color: "#FFF",
  },
});
