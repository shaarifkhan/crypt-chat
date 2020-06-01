const userModel = require("../../database").models.user;

const create = (data, callback) => {
  var newUser = new userModel(data);
  newUser.save(callback);
};

const findOneAndUpdate = (id, params, callback) => {
  userModel.findOneAndUpdate(
    {
      _id: id,
    },
    params,
    callback
  );
};

const findById = (id, params, callback) => {
  userModel.findById(id, callback);
};

const findOne = (query, callback) => {
  userModel.findOne(query, callback);
};
const find = (query, params, callback) => {
  userModel.find(query, params, callback);
};
const fuzzySeach = async (query) => {
  return userModel.fuzzySearch(query);
};

module.exports = {
  create,
  findOneAndUpdate,
  findById,
  findOne,
  find,
  fuzzySeach,
};
