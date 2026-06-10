# 🚀 DevConnect - Real-Time Team Chat Application

A full-stack real-time chat application built using the MERN stack and Socket.io. DevConnect enables users to authenticate securely, join chat rooms, communicate instantly, create new channels, and view online users.

---

## 📸 Screenshots

### Login Page

<img width="510" height="532" alt="Screenshot 2026-06-10 120908" src="https://github.com/user-attachments/assets/c967dc59-faff-4c04-837d-153d5c86b55b" />

### Chat Interface

<img width="1288" height="840" alt="Screenshot 2026-06-10 120853" src="https://github.com/user-attachments/assets/32c5feca-9519-4a72-9211-46eca1a98933" />


## ✨ Features

### Authentication

* JWT-based Login Authentication
* Protected Chat Access
* Secure Logout Functionality

### Real-Time Communication

* Socket.io Powered Messaging
* Instant Message Delivery
* Multi-Room Chat Support

### Room Management

* Create New Chat Rooms
* Join Existing Rooms
* Switch Between Channels

### User Experience

* Online User Count
* Message History Persistence
* Responsive Modern UI
* Auto Scroll to Latest Messages

### Database

* MongoDB Message Storage
* User Data Persistence
* Room Data Management

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)

### Real-Time Communication

* Socket.io

---

## 📂 Project Structure

```text
DevConnect
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── sockets
│   │   └── server.js
│   │
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── services
│   │   └── socket
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/akashsingh005006/DevConnect.git
cd DevConnect
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Backend requires:

```env
MONGO_URI=
JWT_SECRET=
PORT=
```

---

## 🎯 Learning Outcomes

Through this project I gained practical experience with:

* JWT Authentication
* REST API Development
* Socket.io Real-Time Communication
* MongoDB Integration
* State Management in React
* Full-Stack Application Development
* Git & GitHub Workflow

---

## 🚀 Future Improvements

* User Registration UI
* User Profiles
* Online User List with Names
* Typing Indicators
* Message Reactions
* File Sharing

---

## 👨‍💻 Author

Akash Singh

GitHub:
https://github.com/akashsingh005006

LinkedIn:
https://linkedin.com/in/akashsinghconnect
