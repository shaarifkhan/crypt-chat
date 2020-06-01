const router = require("express").Router();
const User = require("../../models/user");
const Room = require("../../models/room");
router.get("/rooms", (req, res, next) => {
  console.log("request ayi he");
  Room.find((err, rooms) => {
    if (err) throw err;
    console.log(rooms);
    res.json(rooms);
  });
});
router.get("/chat/:id", (req, res, next) => {
  const roomId = req.params.id;
  Room.findById(roomId, (err, room) => {
    if (err) {
      console.log("error aya he");
      throw err;
    }
    if (!room) {
      return next();
    }
    res.json({
      roomId: roomId,
    });
  });
});

module.exports = router;
