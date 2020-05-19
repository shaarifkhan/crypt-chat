import firebase from "../config/firebase";
export const getIdToken = async () => {
  try {
    const token = await firebase.auth().currentUser.getIdToken();
    return token;
    // console.log("ye raha token", typeof token);
  } catch (e) {
    console.log(e);
  }
};
