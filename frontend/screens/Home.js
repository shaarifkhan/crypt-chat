import React, { useState } from "react";
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
import AddContact from "./Addcontact";
import Icon from "react-native-vector-icons/FontAwesome";
import MakeGroup from '../screens/MakeGroup'
export default function Home({ navigation }) {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Fawaz Ansari",
      status: "active",
      image:
        "https://scontent.fkhi6-1.fna.fbcdn.net/v/t1.0-9/s960x960/86490745_10216871382282325_2101349845200535552_o.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=9PfyP7Qn_yEAX98rA3s&_nc_ht=scontent.fkhi6-1.fna&_nc_tp=7&oh=90e4beb69a20a3054d0c0f632753bc22&oe=5EC2F9B7",
    },
    {
      id: 2,
      name: "Yahya Zuberi",
      status: "active",
      image:
        "https://scontent.fkhi6-1.fna.fbcdn.net/v/t1.0-9/71756573_10216348027757629_612090860393201664_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=4v2bQle5oAkAX8xGmx2&_nc_ht=scontent.fkhi6-1.fna&oh=3f01386abf6150ac32a062732ffb6a25&oe=5EC14F0F",
    },
    {
      id: 3,
      name: "Shaarif Khan",
      status: "active",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
    {
      id: 4,
      name: "Usman Hussain",
      status: "active",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
    {
      id: 5,
      name: "Azhan Ali",
      status: "active",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
    {
      id: 6,
      name: "Osama Rajput",
      status: "active",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
    {
      id: 8,
      name: "Arbaz Khan",
      status: "active",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
    {
      id: 9,
      name: "Fahad Lodi",
      status: "active",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
    {
      id: 10,
      name: "Taha Farooqui",
      status: "active",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
    {
      id: 11,
      name: "Shaheryar Khalid",
      status: "active",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
  ]);

  const addcontact = (values) => {
    values.key = Math.random().toString();
    values.status = "active";
    values.image =
      "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png";
    setContacts((currentcontact) => {
      return [values, ...currentcontact];
    });
    setModal(false);
  };


  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={modal} animationType="slide">
        <View style={styles.modalContent}>
          <MaterialIcons
            name="close"
            size={24}
            style={{ ...styles.modalToggle, ...styles.modalClose}}
            onPress= {()=>setModal(false)}
          />
          <AddContact addcontact={addcontact} />
        </View>
      </Modal>

      <Modal visible={modal1} animationType="slide">
        <View style={styles.modalContent}>
          <Icon
            name="arrow-circle-right"
            size={28}
            style={{ ...styles.modalToggle, ...styles.modalClose}}
            onPress= {()=>setModal1(false)}
          >
          </Icon>
          <MakeGroup contacts={contacts} />
        </View>
      </Modal>

        <Icon.Button
        name="user"
        style={styles.iconsize}
        backgroundColor="#3b5998"
        onPress={()=>setModal(true)}>
        <Text style={styles.iconsize}>
        Add a new contact
        </Text>
        </Icon.Button>

        <Icon.Button
        name="group"
        style={styles.iconsize}
        backgroundColor="#3b5998"
        onPress={()=>setModal1(true)}>
        <Text style={styles.iconsize}>
        Make a new room
        </Text>
        </Icon.Button>

      <FlatList
        data={contacts}
        keyExtractor={(item) => {
          return item.id ? item.id.toString() : "";
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Chat", item)}>
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
  },
  iconsize: {
    padding:5,
    fontWeight: "bold"
  }
});
