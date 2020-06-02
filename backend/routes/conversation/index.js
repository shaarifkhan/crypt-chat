const express = require("express");
const router = express.Router();
const { getConversations } = require("../../models/conversation");

const getConvos = async (req, res, next) => {
  try {
    const { _id: ownerId } = req.currentUser;
    const result = await getConversations({
      ownerId,
    });
    console.log("this is result", result);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    return next(err);
  }
};
router.get("/secured/getConversations", getConvos);

module.exports = router;
