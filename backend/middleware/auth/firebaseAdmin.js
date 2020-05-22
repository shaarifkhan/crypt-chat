const admin = require("firebase-admin");
const serviceAccount = require("../../crypt-chat-b1698-firebase-adminsdk-zfm2o-faf58cb710.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://crypt-chat-b1698.firebaseio.com",
});
module.exports = admin;
