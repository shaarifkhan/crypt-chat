const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
    ref: "User",
  },
  receiverId: {
    type: String,
    required: true,
    ref: "User",
  },
  message: {
    type: String,
    trim: true,
    default: "",
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
});
const MessageModel = mongoose.model("Message", MessageSchema);
exports.MessageSchema = MessageSchema;
exports.MessageModel = MessageModel;
