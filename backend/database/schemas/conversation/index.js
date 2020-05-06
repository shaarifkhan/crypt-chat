const mongoose = require("mognoose");

const { model, Schema } = mongoose;
const { ObjectID } = Schema.Types;

const ConversationSchema = new Schema({
  ownerId: {
    type: ObjectId,
    ref: "User",
  },
  partnerId: {
    type: ObjectID,
    ref: "User",
  },
  messages: [
    {
      type: ObjectId,
      ref: "Message",
    },
  ],
});
