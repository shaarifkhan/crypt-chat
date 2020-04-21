var express = require("express");
var router = express.Router();
var User = require("../models/user");

// GET route for reading data
router.get("/", function (req, res, next) {
  return res.send("server is live");
});

//POST route for updating data
router.post("/register", function (req, res, next) {
  // confirm that user typed same password twice
  console.log("hello", req.body);
  // if (req.body.password !== req.body.confPassword) {
  //   var err = new Error("Passwords do not match.");
  //   err.status = 400;
  //   // res.send("passwords dont match");
  //   return next(err);
  // }

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
});
router.post("/addContact", (req, res, next) => {
  console.log("req body", req.body);
  User.findOneAndUpdate(
    req.body.userId,
    req.body.friendId,
    req.body.friendname,
    (err, data) => {
      if (err) throw err;
      res.status(200).send("updated");
    }
  );
});
router.post("/getContacts", (req, res, next) => {
  // console.log("yeh check", req.body.userId);
  User.findById(req.body.userId, (error, userData) => {
    contacts = userData.contacts;
    console.log(contacts);
    res.send(contacts);
  });
});
router.post("/login", (req, res, next) => {
  console.log(req.body.email, req.body.password);

  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (
      error,
      user
    ) {
      console.log(error, user);
      if (error || !user) {
        var err = new Error("Wrong email or password.");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        // res.send("logged in");
        return res.redirect("/profile");
      }
    });
  }
});

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
