const Room = require("../models/Room");

const createRoom = async (req, res) => {
  try {
    const room = await Room.create({
      name: req.body.name,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRoom,
  getRooms,
};