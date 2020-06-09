import firebase from "../config/firebase";
import CryptoJS from "react-native-crypto-js";

export const getIdToken = async () => {
  try {
    const token = await firebase.auth().currentUser.getIdToken();
    console.log(token);
    return token;
    // console.log("ye raha token", typeof token);
  } catch (e) {
    console.log(e);
  }
};
export const encryptData = (message) => {
  let ciphertext = CryptoJS.AES.encrypt(message, "secret key 123").toString();
  return ciphertext;
};
export const decryptData = (ciphertext) => {
  var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
