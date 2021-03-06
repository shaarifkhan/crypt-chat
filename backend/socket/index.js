const { Room } = require("../models/room");

const init = (app) => {
  const server = require("http").Server(app);
  global.io = require("socket.io")(server);

  global.io.on("connection", (socket) => {
    socket.on("login", ({ uid }) => {
      // console.log("socket id he", socket.id);
      console.log(`${socket.id} has joined`, uid);
      // console.log("this ", io.sockets.adapter.rooms);
      socket.join(uid);
      console.log(
        "this ",
        io.nsps["/"].adapter.rooms["9cfFEFV19JY50lBAX3SzVV1zFbT2"]
      );
    });
    // socket.on("disconnect", () => {
    //   console.log("disconnected");
    // });
    socket.on("leaveRoom", ({ uid }) => {
      console.log(`${socket.id} has been removed from`, uid);
      console.log(
        "this ",
        io.nsps["/"].adapter.rooms["9cfFEFV19JY50lBAX3SzVV1zFbT2"]
      );

      socket.leave(uid);
    });
  });

  io.of("/rooms").on("connection", (socket) => {
    console.log("connected");
    socket.on("createRoom", (title) => {
      console.log("createRoom called");
      Room.findOne({ title: title }, (err, room) => {
        if (err) throw err;
        if (room) {
          socket.emit("updateRoomsList", {
            error: "Room title already exist.",
          });
        } else {
          Room.create({ title: title }, (err, newRoom) => {
            if (err) throw err;
            socket.emit("updateRoomsList", newRoom);
            socket.broadcast.emit("updateRoomList", newRoom);
          });
        }
      });
    });
  });

  io.of("/chatroom").on("connection", (socket) => {
    console.log("chatroom namespace call hoa he", socket.id);
    socket.on("join", (roomId) => {
      console.log(roomId);
      Room.findById(roomId, (err, room) => {
        if (err) throw err;
        if (!room) {
          socket.emit("updateUsersList", { error: "Room doesn't exist." });
        }

        Room.addUser(room, socket, (err, newRoom) => {
          console.log("callback ayi he");
          if (err) throw err;
          socket.join(newRoom.id);

          console.log("in add user", socket.id, newRoom.id);
          socket.emit("joined", { room: newRoom });
        });
      });
    });
    socket.on("newMessage", ({ roomId, message }) => {
      console.log("roomId", roomId, "message", message);
      clients = io.sockets.adapter.rooms[roomId];
      // cl(clients);
      console.log("in new Message", socket.id, roomId);

      socket.to(roomId).emit("addMessage", message);
    });
    // socket.on("disconnect", () => {
    //   console.log("disconnected");
    //   Room.removeUser(socket, (err, room, userId, cntUsersInRoom) => {
    //     if (err) throw err;

    //     socket.leave(room.id);
    //   });
    // });
  });

  return server;
};
module.exports = init;
