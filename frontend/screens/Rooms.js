// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ScrollView,
//   FlatList,
//   Modal,
// } from "react-native";
// import Header from "../shared/header";
// import { MaterialIcons } from "@expo/vector-icons";
// import AddContact from "./Addcontact";
// import Axios from "axios";
// export default function Rooms({ navigation }) {
//   const [contacts, setContacts] = useState([]);

//   const createRoom = (values) => {
//     console.log({ values });
//     values.key = Math.random().toString();
//     values.status = "active";
//     values.image =
//       "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png";
//     setContacts((currentcontact) => {
//       return [values, ...currentcontact];
//     });
//     setModal(false);
//   };

//   const [modal, setModal] = useState(false);

//   useEffect(() => {
//     Axios.get("http://192.168.43.42:3000/rooms")
//       .then(({ data }) => {
//         console.log(data);
//         setContacts([data, ...contacts]);
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }, []);
//   return (
//     <View style={{ flex: 1 }}>
//       <Modal visible={modal} animationType="slide">
//         <View style={styles.modalContent}>
//           <MaterialIcons
//             name="close"
//             size={24}
//             style={{ ...styles.modalToggle, ...styles.modalClose }}
//             onPress={() => setModal(false)}
//           />
//           {/* <AddContact addcontact={addcontact} navigation={navigation} /> */}
//         </View>
//       </Modal>

//       <MaterialIcons
//         name="add"
//         size={24}
//         style={styles.modalToggle}
//         onPress={() => setModal(true)}
//       />
//       <FlatList
//         data={contacts}
//         keyExtractor={(item) => {
//           return item.id ? item.id.toString() : "";
//         }}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => navigation.navigate("Chat", item)}>
//             <View style={styles.row}>
//               <Image source={{ uri: item.image }} style={styles.pic} />
//               <View>
//                 <View style={styles.nameContainer}>
//                   <Text
//                     style={styles.nameTxt}
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                   >
//                     {item.title}
//                   </Text>
//                   <Text style={styles.mblTxt}>public</Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderColor: "#DCDCDC",
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     padding: 10,
//   },
//   pic: {
//     borderRadius: 30,
//     width: 60,
//     height: 60,
//   },
//   nameContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: 280,
//   },
//   nameTxt: {
//     marginLeft: 15,
//     fontWeight: "800",
//     color: "#222",
//     fontSize: 16,
//     width: 170,
//   },
//   mblTxt: {
//     fontWeight: "200",
//     color: "#777",
//     fontSize: 13,
//   },
//   msgContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   msgTxt: {
//     fontWeight: "400",
//     color: "#008B8B",
//     fontSize: 12,
//     marginLeft: 15,
//   },
//   modalToggle: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#f2f2f2",
//     padding: 10,
//     borderRadius: 10,
//     alignSelf: "center",
//   },
//   modalClose: {
//     marginTop: 20,
//     marginBottom: 0,
//   },
//   modalContent: {
//     flex: 1,
//   },
// });
