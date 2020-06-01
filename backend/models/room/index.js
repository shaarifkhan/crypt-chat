const roomModel = require("../../database").models.rooms;
const User = require("../user");

const create = (data, callback) => {
  const newRoom = new roomModel(data);
  newRoom.save(callback);
};
const find = (data, callback) => {
  roomModel.find(data, callback);
};

const findOne = (data, callback) => {
  roomModel.findOne(data, callback);
};

const findById = (id, callback) => {
  roomModel.findById(id, callback);
};
const addUser = (room, socket, callback) => {
  const userId = socket.id;
  const conn = { userId: userId, socketId: socket.id };
  room.connections.push(conn);
  room.save(callback);
};

const removeUser = (socket, callback) => {
  find(socket.id, (err, rooms) => {
    if (err) return callback(err);
    rooms.every((room) => {
      const pass = true,
        count = 0,
        target = 0;
    });
  });
};
module.exports = {
  create,
  find,
  findById,
  findOne,
  addUser,
  removeUser,
};
