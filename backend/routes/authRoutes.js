var express = require("express");
var router = express.Router();
var User = require("../models/user");

// GET route for reading data
router.get("/", function (req, res, next) {
  return res.send("server is live");
});

postRegister = (req, res, next) => {
  // confirm that user typed same password twice
  console.log("hello", req.body);

  if (req.body.email && req.body.username) {
    var userData = {
      _id: req.body.userId,
      username: req.body.username,
      email: req.body.email,
    };

    User.create(userData, function (error, user) {
      if (error) {
        console.log("error aya he");
        return next(error);
      } else {
        // req.session.userId = user._id;
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

// postLogin = (req, res, next) => {
//   console.log(req.body.email, req.body.password);

//   const {email}
// }
//POST route for updating data
router.post("/register", postRegister);
// router.post("/login", postLogin);
// route.get("/verify-nickname", getVerifyNickname);

// GET route after registering
router.get("/profile", function (req, res, next) {
  User.findById(req.session.userId).exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        var err = new Error("Not authorized! Go back!");
        err.status = 400;
        return next(err);
      } else {
        return res.send(
          "<h1>Name: </h1>" +
            user.username +
            "<h2>Mail: </h2>" +
            user.email +
            '<br><a type="button" href="/logout">Logout</a>'
        );
      }
    }
  });
});

// GET for logout logout
router.get("/logout", function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

module.exports = router;
