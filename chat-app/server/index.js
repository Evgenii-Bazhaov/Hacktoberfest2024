const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const messagesRoutes = require('./routes/messagessRoutes');
const database = require('./config/database');
const socket = require("socket.io");
require('dotenv').config();

database.dbConnect();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/message", messagesRoutes)

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log("App is running on port: ", port);
})

const io = socket(server, {
    cors: {
        origin: "*",
        credentials: true,
    }
});

global.onlineUsers = new Map();  //this map stores all the users which are online

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {     //when user is logged in, socket connection is establised
        onlineUsers.set(userId, socket.id);
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){   //is user is online then msg is sent through socket, otherwise it will be stored in db only
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    })
})