const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const MessageSchema = new Schema({
  senderId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  receiverId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  message: {
    type: String,
    trim: true,
    default: "",
    required: true,
  },
  dataTime: {
    type: Date,
    required: true,
  },
});
exports.MessageSchema = MessageSchema;
exports.MessageModel = new model("Message", MessageSchema);
