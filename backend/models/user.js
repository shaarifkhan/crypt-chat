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
const fuzzySeach = async (query) => {
  // await updateFuzzy(userModel, ["username"]);
  // await removeUnsedFuzzyElements(userModel, ["email", "username"]);

  console.log("inside fuzzy search");
  return userModel.fuzzySearch(query);
};
// const updateFuzzy = async (Model, attrs) => {
//   for await (const doc of Model.find()) {
//     const obj = attrs.reduce(
//       (acc, attr) => ({ ...acc, [attr]: doc[attr] }),
//       {}
//     );
//     await Model.findByIdAndUpdate(doc._id, obj);
//   }
// };
// const removeUnsedFuzzyElements = async (Model, attrs) => {
//   for await (const doc of Model.find()) {
//     const $unset = attrs.reduce(
//       (acc, attr) => ({ ...acc, [`${attr}_fuzzy`]: 1 }),
//       {}
//     );
//     await Model.findByIdAndUpdate(
//       data._id,
//       { $unset },
//       { new: true, strict: false }
//     );
//   }
// };
// usage
// exports.findUser = (query,params,callback) => {

// }

module.exports = {
  create,
  findOneAndUpdate,
  findById,
  findOne,
  find,
  fuzzySeach,
};
