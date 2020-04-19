import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA1VD95rvr-GZgBNn1KFxrtJC5DEtC6RHE",
  authDomain: "crypt-chat-b1698.firebaseapp.com",
  databaseURL: "https://crypt-chat-b1698.firebaseio.com",
  projectId: "crypt-chat-b1698",
  storageBucket: "crypt-chat-b1698.appspot.com",
  messagingSenderId: "227200582587",
  appId: "1:227200582587:web:78c919e745e7a97f31fa9e",
  measurementId: "G-847XRD0FBR",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
