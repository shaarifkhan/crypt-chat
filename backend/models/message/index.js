const { MessageModel } = require("../../database/schemas/message");

exports.addMessage = (model) => {
  const message = new MessageModel(model);
  return message.save();
};
