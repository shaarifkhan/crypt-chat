const express = require("express");
const router = express.Router();
var User = require("../../models/user");

const postContact = async (req, res, next) => {
  const { email: contactEmail } = req.body;
  const { _id: contactOwnerId } = req.currentUser;
  console.log(contactEmail, contactOwnerId);
  try {
    User.findOne(
      {
        email: contactEmail,
      },
      (err, contactUser) => {
        if (err) console.log(err);
        else {
          User.findOneAndUpdate(
            contactOwnerId,
            {
              $addToSet: {
                contacts: {
                  contactUserId: contactUser._id,
                },
              },
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
        }
      }
    );
  } catch (e) {
    return next(e);
  }
};
const getContact = async (req, res, next) => {
  const { _id } = req.currentUser;
  try {
    //find if the user who requested for his contact, is present
    User.findOne({ _id }, (err, result) => {
      if (err) {
        console.log(error);
      } else {
        User.find(
          {
            _id: {
              $in: result.contacts.map((item) => item.contactUserId),
            },
          },
          {
            contacts: false,
          },
          (err, users) => {
            if (err) throw err;
            else {
              console.log("ye hain users", users);
              res.status(200).json({
                success: true,
                result: users,
              });
            }
          }
        );
      }
    });
  } catch (e) {
    console.log("error aya he");
    return next(e);
  }
};

router.post("/secured/postContact", postContact);

router.get("/secured/getContact", getContact);

// route.post("/secured/contact", postContact);
// route.get("/secured/contact", getContact);
// route.delete("/secured/contact", deleteContact);

module.exports = router;
