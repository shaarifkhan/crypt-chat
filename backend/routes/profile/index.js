const express = require("express");
const router = express.Router();
var User = require("../../models/user");

const getProfile = async (req, res, next) => {
  const { _id } = req.currentUser;
  console.log("req ayi he get profile", _id);
  try {
    //find if the user who requested for his contact, is present
    User.findOne(
      { _id },
      // { contacts: false, username_fuzzy: 0 },
      (err, result) => {
        if (err) {
          console.log(error);
          return next(err);
        } else {
          console.log(result);
          res.status(200).json({
            success: true,
            result: result,
          });
        }
      }
    );
  } catch (e) {
    console.log("error aya he");
    return next(e);
  }
};

router.get("/secured/getProfile", getProfile);

router.post("/secured/postProfilePic", (req, res, next) => {
  const { _id: contactOwnerId } = req.currentUser;

  const { imageLink } = req.body;
  try {
    User.findOneAndUpdate(
      contactOwnerId,
      {
        image: imageLink,
      },
      (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.status(200).json({
            success: true,
            errors: {},
          });
        }
      }
    );
    console.log("image link succesfully added");
  } catch (err) {
    console.log("error aya he");
    return next(e);
  }
});

// router.get("/secured/getProfile", getProfile);

// route.post("/secured/contact", postContact);
// route.get("/secured/contact", getContact);
// route.delete("/secured/contact", deleteContact);

module.exports = router;
