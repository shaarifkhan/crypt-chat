const { MessageModel } = require("../../database/schemas/message");

exports.addMessage = (model, callback) => {
  const message = new MessageModel(model);
  return message.save(callback);
};
// exports.deleteMessages =
