import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type props = {
    socket: Socket;
};

const Messages: React.FC<props> = ({ socket }) => {
    const [messageRecived, setMessageRecived] = useState<messageT[]>([]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageRecived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    createdtime: data.createdtime,
                },
            ]);
        });

        socket.on("last_20_message", (data) => {
            console.log(data);
            setMessageRecived((state) => [...data, ...state]);
        });

        return () => {
            socket.off("receive_message");
            socket.off("last_20_message");
        };
    }, [socket]);

    function formatDateFromTimestamp(timestamp: string) {
        const date = new Date(Number(timestamp));
        return date.toLocaleString();
    }

    return (
        <div className="h-[85vh] bg-blue-200 overflow-auto">
            {messageRecived.map((m, i) => (
                <div
                    className="bg-blue-600 mb-6 rounded-md p-3 max-w-xl m-1"
                    key={i}
                >
                    <div className="flex justify-between">
                        <span className="font-sembold text-sm text-gray-800">
                            {m.username}
                        </span>
                        <span className="text-xs font-medium text-gray-700">
                            {formatDateFromTimestamp(m.createdtime)}
                        </span>
                    </div>
                    <p className="mt-2">{m.message}</p>
                </div>
            ))}
        </div>
    );
};

export default Messages;
