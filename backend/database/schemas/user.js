"use strict";

const mongoose = require("mongoose");
const { ContactSchema } = require("./contact/index");
// const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  contacts: [
    {
      type: ContactSchema,
    },
  ],
});

const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
