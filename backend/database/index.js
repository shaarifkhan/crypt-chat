const Mongoose = require("mongoose");

Mongoose.connect(
  "mongodb+srv://shaarif:khankhan123@cluster0-bdjrj.mongodb.net/test?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

Mongoose.connection.on("error", (err) => {
  if (err) {
    console.log("connection fail");
    throw err;
  }
});
Mongoose.connection.once("open", () => {
  console.log("database connected");
});

Mongoose.Promise = global.Promise;

module.exports = {
  Mongoose,
  models: {
    user: require("./schemas/user"),
    rooms: require("./schemas/room"),
  },
};
