const express = require("express");
const router = express.Router();
const moment = require("moment");
const { addMessage } = require("../../models/message/index");
const postMesage = (req, res) => {
  const { message, receiverId, senderId } = req.body;

  // const {_id:senderId}
  const model = {
    senderId,
    receiverId,
    message,
    dateTime: moment.utc().toDate(),
  };
  try {
    addMessage(model, (err, messageResult) => {
      if (err) return next(err);
      else {
        global.io.to(receiverId).emit("message.new", {
          message: messageResult,
          sender: senderId,
        });
        res.status(200).json({
          success: true,
          result: messageResult,
        });
      }
    });
  } catch (e) {
    return next(e);
  }
};

router.post("/postmessage", postMessage);
router.post("/getmessage", getMessage);
// router.delete('/message', deleteMessage)

module.exports = router;
