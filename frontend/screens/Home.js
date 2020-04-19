import React, {useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import Header from '../shared/header';

export default function Home ({navigation}) {
    const [contacts, setContacts]= useState([
        {id:1,  name: "Fawaz Ansari",    status:"active", image:'https://scontent.fkhi6-1.fna.fbcdn.net/v/t1.0-9/s960x960/86490745_10216871382282325_2101349845200535552_o.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=9PfyP7Qn_yEAX98rA3s&_nc_ht=scontent.fkhi6-1.fna&_nc_tp=7&oh=90e4beb69a20a3054d0c0f632753bc22&oe=5EC2F9B7'},
        {id:2,  name: "Yahya Zuberi",   status:"active", image:"https://scontent.fkhi6-1.fna.fbcdn.net/v/t1.0-9/71756573_10216348027757629_612090860393201664_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=4v2bQle5oAkAX8xGmx2&_nc_ht=scontent.fkhi6-1.fna&oh=3f01386abf6150ac32a062732ffb6a25&oe=5EC14F0F"} ,
        {id:3,  name: "Shaarif Khan",  status:"active", image:"https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png"} ,
        {id:4,  name: "Usman Hussain",  status:"active", image:"https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png"} ,
        {id:5,  name: "Azhan Ali",   status:"active", image:"https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png"} ,
        {id:6,  name: "Osama Rajput", status:"active", image:"https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png"} ,
        {id:8,  name: "Arbaz Khan", status:"active", image:"https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png"} ,
        {id:9,  name: "Fahad Lodi",    status:"active", image:"https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png"} ,
        {id:10, name: "Taha Farooqui",  status:"active", image:"https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png"} ,
        {id:11, name: "Shaheryar Khalid",   status:"active", image:"https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png"},
    ])
    return(
        <View style={{ flex: 1 }} >
        <FlatList 
            data={contacts}
            keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={( {item} )=> (
            <TouchableOpacity onPress={()=> navigation.navigate("Chat", item) } >
              <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.pic} />
                <View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '800',
    color: '#222',
    fontSize: 16,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
}); 