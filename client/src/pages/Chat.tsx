import React from "react";
import ChatroomUser from "./ChatroomUser";
import { Socket } from "socket.io-client";

type Props = {
    username: string;
    room: string;
    socket: Socket;
};

const Chat: React.FC<Props> = (Props) => {
    return (
        <div className="max-w-6xl mx-auto my-0 grid grid-cols-5 gap-4 bg-gray-500 h-screen">
            <ChatroomUser props={Props} />
            <div className="col-span-4">section B</div>
        </div>
    );
};

export default Chat;
