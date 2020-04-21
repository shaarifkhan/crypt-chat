const userModel = require("../database").models.user;

const create = (data, callback) => {
  var newUser = new userModel(data);
  newUser.save(callback);
};

const findOneAndUpdate = async (userId, friendId, friendname, callback) => {
  console.log(userId, friendId);
  doc = await userModel.findOneAndUpdate(
    { _id: userId },
    { $push: { contacts: { username: friendname, _id: friendId } } },
    callback
  );
};

const findById = (id, callback) => {
  console.log(id);
  userModel.findById(id, callback);
};

module.exports = {
  create,
  findOneAndUpdate,
  findById,
};
