const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const messageRoutes = require("./routes/messageRoutes");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const setupSocket = require("./sockets/chatSocket");
dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("DevConnect Backend Running");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

setupSocket(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});