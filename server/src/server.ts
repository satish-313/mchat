import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { allUserT, roomData } from "../typing";
import { leaveRoom } from "./utils";

dotenv.config();

const chatroom = [];
let allUser: allUserT[] = [];

const app = express();
const PORT = process.env.PORT || 4040;
// middleware
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

app.get("/", (req, res) => {
    res.json("hello");
});

io.on("connection", (socket) => {
    // console.log(`User connected connection ${socket.id}`);

    // Add a user to a room
    socket.on("joinRoom", (data: roomData) => {
        const { username, room } = data;
        socket.join(room);
        // console.log(data, "join room")
        let _createdtime_ = Date.now();
        socket.to(room).emit("receive_message", {
            message: `${username} has join room`,
            username: "ChatBot",
            _createdtime_,
        });

        socket.emit("receive_message", {
            message: `Welcom ${username}`,
            username: "ChatBot",
            _createdtime_,
        });

        allUser.push({ id: socket.id, username, room });
        const chatRoomUser = allUser.filter((u) => u.room === room);
        socket.to(room).emit("chatroom_users", chatRoomUser);
        socket.emit("chatroom_users", chatRoomUser);
    });

    // leave user
    socket.on("leave_room", (data: allUserT) => {
        const { username, room } = data;
        socket.leave(room);
        const __createdtime__ = Date.now();

        allUser = leaveRoom(socket.id, allUser);
        socket.to(room).emit("chatroom_users", allUser);
        socket.to(room).emit("receive_message", {
            username: "CHAT_BOT",
            message: `${username} has left the chat`,
            __createdtime__,
        });
    });
});

server.listen(PORT, () => `server is running on ${PORT}`);
