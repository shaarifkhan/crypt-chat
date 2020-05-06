const express = require("express");
const router = express.Router();
const moment = require("moment");
const { addMessage } = require("../../models/message");
const {
  getConversation,
  findOneConversationAndUpdate,
} = require("../../models/conversation");

const postMessage = async (req, res, next) => {
  console.log("inside post message");
  console.log("datetime = ", moment.utc().toDate());
  const { message, receiverId } = req.body;
  const { _id: senderId } = req.currentUser;

  // const {_id:senderId}
  const model = {
    senderId,
    receiverId,
    message,
    dateTime: moment.utc().toDate(),
  };
  try {
    const messageResult = await addMessage(model);
    await findOneConversationAndUpdate(
      {
        ownerId: senderId,
        partnerId: receiverId,
      },
      {
        ownerId: senderId,
        partnerId: receiverId,
        $addToSet: {
          messages: messageResult._id,
        },
      }
    );

    await findOneConversationAndUpdate(
      {
        ownerId: receiverId,
        partnerId: senderId,
      },
      {
        ownerId: receiverId,
        partnerId: senderId,
        $addToSet: {
          messages: messageResult._id,
        },
      }
    );
    global.io.to(receiverId).emit("message.new", {
      message: messageResult,
      sender: req.currentUser,
    });

    res.status(200).json({
      success: true,
      result: messageResult,
    });
  } catch (err) {
    console.log("err aya he in message", err);
    return next(err);
  }
};

const getMessages = async (req, res, next) => {
  const { partnerId } = req.query;
  const { _id: ownerId } = req.currentUser;
  try {
    const result = await getConversation({
      partnerId,
      ownerId,
    });
    console.log("result", result);
    res.status(200).json({
      success: true,
      result: result
        ? result.messages.map((item) => {
            const { dateTime, message, senderId, _id } = item;
            return {
              dateTime,
              message,
              currentUserIsSender: String(senderId) === String(ownerId),
              _id,
            };
          })
        : [],
    });
  } catch (e) {
    return next(e);
  }
};

router.post("/secured/postmessage", postMessage);
router.get("/secured/getmessages", getMessages);
// router.delete('/message', deleteMessage)

module.exports = router;
