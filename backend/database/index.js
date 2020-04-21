const Mongoose = require("mongoose");

Mongoose.connect("mongodb://localhost:27017/crypt-chat", {
  useMongoClient: true,
});

Mongoose.connection.on("error", (err) => {
  if (err) {
    console.log("connection fail");
    throw err;
  }
});

Mongoose.Promise = global.Promise;

module.exports = {
  Mongoose,
  models: {
    user: require("./schemas/user"),
    rooms: require("./schemas/rooms"),
  },
};
