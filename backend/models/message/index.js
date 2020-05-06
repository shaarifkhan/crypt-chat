const { MessageModel } = require("../../database/schemas/message");
// console.log("ye he MessageModel", MessageModel);

exports.addMessage = (model) => {
  const message = new MessageModel(model);
  return message.save();
};
// exports.deleteMessages =
