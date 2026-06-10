import { useEffect, useState, useRef } from "react";
import socket from "../socket/socket";

import { getMessages } from "../services/messageService";
import {
  getRooms,
  createRoom,
} from "../services/roomService";

import "./ChatPage.css";

function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [roomId, setRoomId] = useState(
  "6a26812242713af50441a6d5"
);
const [rooms, setRooms] = useState([]);
const [newRoom, setNewRoom] = useState("");

const [onlineUsers, setOnlineUsers] = useState([]);

  const messagesEndRef = useRef(null);

  const userId = localStorage.getItem("userId");

  const sendMessage = () => {
   socket.emit("sendMessage", {
 room: roomId,
  sender: userId,
  content: message,
});

    console.log("Message Sent:", message);

    setMessage("");
  };

const handleCreateRoom = async () => {
  if (!newRoom.trim()) return;

  const data = await createRoom(newRoom);

  if (data.success) {
    const updatedRooms = await getRooms();

    setRooms(updatedRooms.rooms);

    setNewRoom("");
  }
};

useEffect(() => {
const loadMessages = async () => {
const data = await getMessages(roomId);
setMessages(data.messages);
};

const loadRooms = async () => {
const data = await getRooms();
setRooms(data.rooms);
};

loadMessages();
loadRooms();

socket.emit("joinRoom", roomId);

if (userId) {
socket.emit("userOnline", userId);
}

const receiveMessageHandler = (data) => {
console.log("Message Received:", data);


setMessages((prev) => [...prev, data]);


};

const onlineUsersHandler = (users) => {
  console.log("ONLINE USERS EVENT:", users);
  console.log("ONLINE USERS ARRAY:", JSON.stringify(users));

  setOnlineUsers(users);
};

socket.on("receiveMessage", receiveMessageHandler);
socket.on("onlineUsers", onlineUsersHandler);

return () => {
socket.off("receiveMessage", receiveMessageHandler);
socket.off("onlineUsers", onlineUsersHandler);
};
}, [roomId, userId]);

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);


  return (
  <div className="chat-container">
    <div className="app-layout">
      
      <div className="rooms-panel">

  <div className="sidebar-logo">
    <div className="logo-dot"></div>
    <div className="logo-text">DevConnect</div>
  </div>

  <div className="sidebar-section-label">
    Channels
  </div>

  

  <div className="room-list">
    {rooms.map((room) => (
      <button
        key={room._id}
        className={
          roomId === room._id
            ? "room-btn active"
            : "room-btn"
        }
        onClick={() => setRoomId(room._id)}
      >
        <span className="hash-icon">#</span>
        {room.name}
      </button>
    ))}
  </div>

 <div className="sidebar-divider"></div>

<div className="online-header">
  ONLINE — {onlineUsers.length}
</div>

  <div className="create-room-row">
    <input
      type="text"
      placeholder="Add channel"
      value={newRoom}
      onChange={(e) => setNewRoom(e.target.value)}
    />

    <button
      className="create-room-btn"
      onClick={handleCreateRoom}
    >
      Create Room
    </button>
  </div>

  <div className="sidebar-footer">
    <div className="user-row">

      <div className="avatar avatar-lg">
        AK
        <span className="online-indicator"></span>
      </div>

      <div>
        <div className="user-name">
          Akash
        </div>

       <div className="user-status">
  {onlineUsers.length} users online
</div>
      </div>
<button
  className="logout-btn"
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.reload();
  }}
>
  ⎋
</button>

    </div>
  </div>

</div>

      <div className="chat-panel">

       <div className="chat-header">

  <div className="chat-header-left">
    <span className="hash-icon">#</span>

    <div>
      <div className="room-name">
        {
          rooms.find(
            (room) => room._id === roomId
          )?.name || "Room"
        }
      </div>

      <div className="room-meta">
        Real-time chat
      </div>
    </div>
  </div>

  <div className="live-badge">
    Socket.io Live
  </div>

</div>

        <div className="messages-box">
         {messages.map((msg, index) => {
  const isMine = msg.sender?._id === userId;

  return (
    <div
      key={index}
      className={`message-group ${
        isMine ? "mine" : ""
      }`}
    >
      <div className="avatar">
        {(msg.sender?.name || "U")
          .charAt(0)
          .toUpperCase()}
      </div>

      <div className="message-content">
     <div className="message-header">
          <span className="message-author">
            {isMine
              ? "You"
              : msg.sender?.name || "User"}
          </span>

          <span className="message-time">
            {new Date(
              msg.createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div
          className={`bubble ${
            isMine ? "mine" : "other"
          }`}
        >
          {msg.content}
        </div>
      </div>
    </div>
  );
})}
          <div ref={messagesEndRef}></div>
        </div>

       <div className="chat-input-row">

  <input
    type="text"
    placeholder="Message channel..."
    value={message}
    onChange={(e) =>
      setMessage(e.target.value)
    }
  />

  <button
    className="send-btn"
    onClick={sendMessage}
  >
    Send
  </button>

</div>

      </div>
    </div>
  </div>
);
}

export default ChatPage;