import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  YellowBox,
} from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]);
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Header from "../shared/Profileheader";
import firebase from "../config/firebase";
import axios from "axios";
import { getIdToken } from "../commons";
const storage = firebase.storage();
const { baseUrl } = require("../config/dev-config.json");

export default function Profile({ navigation }) {
  [image, setImage] = useState(null);
  [email, setEmail] = useState("");
  [username, setUsername] = useState("");

  const getPermissionAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  useEffect(() => {
    getPermissionAsync();
    // axios
    //   .get(baseUrl + "/getProfile")
    //   .then((res) => {
    //     if (res.success == "true") return res;
    //   })
    //   .then(({ result }) => {
    //     console.log(result);
    //   });
  }, []);
  const uploadLink = (imageLink) => {
    getIdToken().then((token) => {
      console.log("first");
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .post(baseUrl + "/secured/postProfilePic", { imageLink })
        .then(({ data }) => {})
        .catch((err) => {
          console.log("err while uploadLink", err);
          throw err;
        });
    });
  };
  const uploadProfile = async (uri) => {
    console.ignoredYellowBox = ["Setting a timer"];

    // Create the file metadata
    const response = await fetch(uri);
    const blob = await response.blob();

    var metadata = {
      contentType: "image/jpeg",
    };
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uploadTask = storage
          .ref(`images/${user.uid}`)
          .put(blob, metadata);
        uploadTask.on(
          "state_changed",
          function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // See below for more detail
          },
          function (error) {
            // Handle unsuccessful uploads
          },
          function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                console.log(downloadURL);
                uploadLink(downloadURL);
              });
          }
        );
      }
    });
  };
  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        uploadProfile(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };
  return (
    <View>
      <View style={styles.mainheader}>
        <Header title="Profile" navigation={navigation} />
      </View>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={require("../assets/fawaz.jpg")} />
        {image && <Image style={styles.avatar} source={{ uri: image }} />}

        {/* <Image
        style={styles.avatar}
        source={{
          uri:
            "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
        }}
      /> */}

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>Shaarif Khan</Text>
            <Text style={styles.info}>UX/UI Designer / Mobile developer</Text>
            <Text style={styles.description}>Welcome to crypt chat</Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => _pickImage()}
            >
              <Text style={styles.text}>Change Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.text}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
  },
  header: {
    backgroundColor: "#43484d",
    height: 200,
    marginTop: 0,
    //backgroundColor: "#00868B", height: 70
  },
  mainheader: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    backgroundColor: "#00868B",
    height: 70,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    letterSpacing: 1,
    alignContent: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00868B",
  },
});
