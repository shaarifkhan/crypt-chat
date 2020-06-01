"use strict";

const Mongoose = require("mongoose");

const RoomSchema = new Mongoose.Schema({
  title: { type: String, required: true },
  connections: {
    type: [{ userId: String, socketId: String }],
    messages: [
      {
        author: Mongoose.Schema.Types.ObjectId,
        body: String,
        timestamps: true,
      },
    ],
  },
});

var roomModel = Mongoose.model("rooms", RoomSchema);
module.exports = roomModel;
