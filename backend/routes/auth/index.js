var express = require("express");
var router = express.Router();
var User = require("../../models/user");

// GET route for reading data
router.get("/", function (req, res, next) {
  return res.send("server is live");
});

postRegister = (req, res, next) => {
  if (req.body.email && req.body.username) {
    var userData = {
      _id: req.body.userId,
      username: req.body.username,
      email: req.body.email,
    };

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        console.log(user);
        return res.status(200).send("registered");
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
};

const findUser = async (req, res, next) => {
  const { userName } = req.query;
  try {
    const users = await User.fuzzySeach(userName);
    return res.json(users);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

//POST route for updating data
router.post("/register", postRegister);
router.get("/findUser", findUser);

module.exports = router;
