"use strict";

const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contacts: {
    type: [{ _id: String, username: String }],
    unique: true,
    trim: true,
  },
});

const userModel = Mongoose.model("user", UserSchema);
module.exports = userModel;
