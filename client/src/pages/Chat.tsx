import React from "react";
import ChatroomUser from "../components/ChatroomUser";
import { Socket } from "socket.io-client";
import Messages from "../components/Messages";

type Props = {
    username: string;
    room: string;
    socket: Socket;
};

const Chat: React.FC<Props> = (Props) => {
    return (
        <div className="max-w-6xl mx-auto my-0 grid grid-cols-5 gap-4 bg-gray-500 h-screen">
            <ChatroomUser props={Props} />
            <div className="col-span-4">
                <Messages socket={Props.socket} />
            </div>
        </div>
    );
};

export default Chat;
