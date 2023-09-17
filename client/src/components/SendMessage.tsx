import React, { useState } from "react";
import { Socket } from "socket.io-client";

type props = {
    socket: Socket;
    username: string;
    room: string;
};

const SendMessage: React.FC<props> = ({ socket, username, room }) => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message.trim() !== "") {
            const createdtime = Date.now();
            socket.emit("send_message", {
                username,
                room,
                message,
                createdtime,
            });
            setMessage("");
        }
    };
    return (
        <div className="flex justify-between my-2">
            <input
                className="w-4/5 rounded-md"
                placeholder="message.."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                onClick={sendMessage}
                className="px-2 py-1.5 bg-lime-600 rounded-md text-gray-700 font-semibold hover:bg-lime-300"
            >
                Send Message
            </button>
        </div>
    );
};

export default SendMessage;
