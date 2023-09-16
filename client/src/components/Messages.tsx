import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type props = {
    socket: Socket;
};

const Messages: React.FC<props> = ({ socket }) => {
    const [messageRecived, setMessageRecived] = useState<messageT[]>([]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageRecived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    __createdtime__: data.__createdtime__,
                },
            ]);
        });

        return () => {
            socket.off("receive_message");
        };
    }, [socket]);

    function formatDateFromTimestamp(timestamp: string) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return <div className="h-[85vh] bg-red-500 px-5 py-2 overflow-auto"></div>;
};

export default Messages;
