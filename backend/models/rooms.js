const roomModel = require("../database").models.rooms;
const User = require("./user");

const create = (data, callback) => {
  const newRoom = new roomModel(data);
  newRoom.save(callback);
};
const find = (data, callback) => {
  roomModel.findOne(data, callback);
};
const addUser = (room, socket, callback) => {
  const userId = socket.userId;
  const conn = { userId: userId, socketId: socket.id };
  room.connections.push(conn);
  room.save(callback);
};
module.exports = {
  create,
  find,
  // findOne,
  // findById,
};
