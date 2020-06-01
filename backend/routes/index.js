const contactRoutes = require("./contact");
const authRoutes = require("./auth");
const messageRoutes = require("./message");
const conversationRoutes = require("./conversation");
var roomRoutes = require("./room");

const firebaseMiddleware = require("../middleware/auth");

module.exports.expressRoutes = (app) => {
  app.use(authRoutes);
  app.use("/secured", firebaseMiddleware);
  app.use(contactRoutes);
  app.use(conversationRoutes);
  app.use(messageRoutes);
  app.use(roomRoutes);
};
