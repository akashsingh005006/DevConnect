const onlineUsers = new Set();
const Message = require("../models/Message");
const setupSocket = (io) => {

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

 socket.on("userOnline", (userId) => {
  if (!userId) return;

  socket.userId = userId;

  onlineUsers.add(userId);

  io.emit(
    "onlineUsers",
    Array.from(onlineUsers)
  );
});

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);

      console.log(`Joined Room: ${roomId}`);
    });

   socket.on("sendMessage", async (data) => {
  try {
    console.log("Message Received:", data);
    
await Message.create({
  room: data.room,
  sender: data.sender,
  content: data.content,
});

    io.to(data.room).emit("receiveMessage", data);

  } catch (error) {
    console.log(error.message);
  }
});

    socket.on("disconnect", () => {

      if (socket.userId) {
  onlineUsers.delete(socket.userId);

  io.emit(
    "onlineUsers",
    Array.from(onlineUsers)
  );
}
      console.log("User Disconnected:", socket.id);
    });
  });
};

module.exports = setupSocket;