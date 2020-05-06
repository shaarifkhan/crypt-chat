const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    ref: "User",
  },
  partnerId: {
    type: String,
    ref: "User",
  },
  messages: [
    {
      type: String,
      ref: "Message",
    },
  ],
});

const ConversationModel = mongoose.model("Conversation", ConversationSchema);
exports.ConversationModel = ConversationModel;
exports.ConversationSchema = ConversationSchema;
