import { io } from "socket.io-client";

const socket = io("https://devconnect-mp2n.onrender.com");

export default socket;