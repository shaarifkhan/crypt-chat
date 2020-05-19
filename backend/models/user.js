const userModel = require("../database").models.user;

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
  console.log(id);
  userModel.findById(id, callback);
};

const findOne = (query, callback) => {
  console.log("now here 2");
  userModel.findOne(query, callback);
};
const find = (query, params, callback) => {
  userModel.find(query, params, callback);
};
// exports.findUser = (query,params,callback) => {

// }

module.exports = {
  create,
  findOneAndUpdate,
  findById,
  findOne,
  find,
};
