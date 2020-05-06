const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const ContactSchema = new Schema({
  contactUserId: {
    type: String,
    required: true,
  },
});
exports.ContactSchema = ContactSchema;
