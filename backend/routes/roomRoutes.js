const router = require("express").Router();
const User = require("../models/user");
const Room = require("../models/rooms");
router.get("/rooms", (req, res, next) => {
  console.log("request ayi he");
  Room.find((err, rooms) => {
    if (err) throw err;
    console.log(rooms);
    res.json(rooms);
  });
});

module.exports = router;
