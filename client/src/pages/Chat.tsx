import React from "react";
import ChatroomUser from "../components/ChatroomUser";
import { Socket } from "socket.io-client";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";

type Props = {
    username: string;
    room: string;
    socket: Socket;
};

const Chat: React.FC<Props> = (Props) => {
    const { socket, username, room } = Props;
    return (
        <div className="max-w-6xl mx-auto my-0 grid grid-cols-5 gap-4 bg-gray-500 h-screen">
            <ChatroomUser props={Props} />
            <div className="col-span-4 m-3">
                <Messages socket={Props.socket} />
                <SendMessage socket={socket} username={username} room={room} /> 
            </div>
        </div>
    );
};

export default Chat;
