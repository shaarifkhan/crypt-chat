import React, { Component, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { baseUrl } from "../config/dev-config.json";
import Icon from "react-native-vector-icons/Ionicons";
import { getIdToken } from "../commons";
import axios from "axios";

export default function FlatListDemo({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      _id: 11,
      username: "Imran Khan",
      email: "imran@tatti.com",
      status: "active",
      image:
        "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
    },
  ]);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");

  const submitToServer = (email) => {
    // console.log(user.uid);
    getIdToken().then((token) => {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .post(baseUrl + "/secured/postContact", { email: email })
        .then(({ data }) => {
          // console.log(data);
          console.log("fawaz")
        })
        .catch((err) => {
          console.log("yhi par error aa gaya", err);
          throw err;
        });
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

  const handlePress = (email) => {
    Alert.alert(
      "Add Contact",
      `Do you want to add ${email} as your contact`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            console.log("contact added");
            submitToServer(email);
            Alert.alert(
              'Contact Added Successfully',
              '',
              [
                { text: 'OK', onPress: () => navigation.navigate("FindContact") }
              ],
              { cancelable: false }
            );
          },
        },
      ],
      { cancelable: false }
    );
  };
  const makeRemoteRequest = () => {
    const url = baseUrl + "/findUser" + `?userName=${value}`;
    console.log(url);
    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log();
        setData(res);
        setError(res.err);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    console.log("first");
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
        }}
      />
    );
  };

  const searchFilterFunction = (text) => {
    setValue(text);
    makeRemoteRequest();
    console.log("secound");

    // console.log(this.arrayholder);
    // const newData = this.arrayholder.filter((item) => {
    //   const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
    //   const textData = text.toUpperCase();

    //   return itemData.indexOf(textData) > -1;
    // });
  };

  // renderHeader = () => {
  //   return (
  //     <SearchBar
  //       placeholder="Type Here..."
  //       lightTheme
  //       showLoading
  //       round
  //       onChangeText={(text) => searchFilterFunction(text)}
  //       autoCorrect={false}
  //       value={value}
  //     />
  //   );
  // };

  // return {renderHeader()};
  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //       {renderHeader()}
  //       {/* <ActivityIndicator /> */}
  //     </View>
  //   );
  // }
  return (
    <View style={{ flex: 1 }}>
    <SearchBar
        placeholder="Type Here..."
        lightTheme
        showLoading
        round
        onChangeText={(text) => searchFilterFunction(text)}
        autoCorrect={true}
        value={value}
      />
      {/* {renderHeader()} */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListItem
            leftAvatar={{
              source: {
                uri:
                  "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
              },
            }}
            key={item._id}
            title={item.username}
            subtitle={item.email}
            rightIcon={
              <Icon
                size={25}
                name={"md-person-add"}
                onPress={() => {
                  handlePress(item.email);
                }}
              />
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={renderSeparator}
        //ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

// export default FlatListDemo;
