import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { leaveRoom } from "./utils";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const chatroom = [];
let allUser: allUserT[] = [];
const prisma = new PrismaClient();

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

app.get("/", async (req, res) => {
    res.json("hello");
});

io.on("connection", (socket) => {
    // console.log(`User connected connection ${socket.id}`);

    // Add a user to a room
    socket.on("joinRoom", async (data: roomData) => {
        const { username, room } = data;
        socket.join(room);
        // console.log(data, "join room")
        let createdtime = Date.now();
        socket.to(room).emit("receive_message", {
            message: `${username} has join room`,
            username: "ChatBot",
            createdtime,
        });

        socket.emit("receive_message", {
            message: `Welcome ${username}`,
            username: "ChatBot",
            createdtime,
        });
        let last_20_message: messageT[] = [];
        try {
            last_20_message = await prisma.messagetable.findMany({
                where: {
                    room,
                },
                orderBy: {
                    id: "desc",
                },
                take: 20,
            });
        } catch (error) {
            console.log(error);
        }
        socket.on("disconnect", () => {
            const user = allUser.find((user) => user.id == socket.id);
            let createdtime = Date.now();

            if (user?.username) {
                allUser = leaveRoom(socket.id, allUser);
                socket.to(room).emit("chatroom_users", allUser);
                socket.to(room).emit("receive_message", {
                    message: `${user.username} has disconnected from the chat.`,
                    username: "ChatBot",
                    createdtime: createdtime,
                });
            }
        });
        allUser.push({ id: socket.id, username, room });
        const chatRoomUser = allUser.filter((u) => u.room === room);
        socket.to(room).emit("chatroom_users", chatRoomUser);
        socket.emit("chatroom_users", chatRoomUser);
        socket.emit("last_20_message", last_20_message);
    });

    // leave user
    socket.on("leave_room", (data: allUserT) => {
        const { username, room } = data;
        socket.leave(room);
        const createdtime = Date.now();

        allUser = leaveRoom(socket.id, allUser);
        socket.to(room).emit("chatroom_users", allUser);
        socket.to(room).emit("receive_message", {
            username: "CHAT_BOT",
            message: `${username} has left the chat`,
            createdtime,
        });
    });

    // send message
    socket.on("send_message", async (data: messageT) => {
        const { createdtime, message, room, username } = data;
        io.in(room).emit("receive_message", data);
        try {
            await prisma.messagetable.create({
                data: {
                    message,
                    room,
                    username,
                    createdtime: `${createdtime}`,
                },
            });
            // console.log(data)
        } catch (error) {
            console.log(error);
        }
    });

    // disconnect
});

server.listen(PORT, () => `server is running on ${PORT}`);
