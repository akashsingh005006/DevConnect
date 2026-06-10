const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  try {
    const message = await Message.create({
      room: req.body.roomId,
      sender: req.user.id,
      content: req.body.content,
    });

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      room: req.params.roomId,
    }).populate("sender", "name");

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};