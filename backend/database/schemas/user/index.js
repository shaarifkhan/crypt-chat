"use strict";

const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

const { ContactSchema } = require("../contact");

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
UserSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    {
      name: "firstName",
      prefixOnly: true,
    },
    {
      name: "email",
      minSize: 4,
    },
  ],
});

const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
