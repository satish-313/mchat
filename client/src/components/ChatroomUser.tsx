import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
type props = {
    username: string;
    room: string;
    socket: Socket;
};
type Props = {
    props: props;
};
type allUserT = {
    username: string;
    id: string;
    room: string;
};

const ChatroomUser: React.FC<Props> = ({ props }) => {
    const { socket, username, room } = props;
    const [roomUsers, setRoomUsers] = useState<allUserT[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("chatroom_users", (data: allUserT[]) => {
            setRoomUsers(data);
        });

        return () => {
            socket.off("chatroom_users");
        };
    }, [socket]);

    const leaveRoom = () => {
        const createdtime = Date.now();
        socket.emit("leave_room", { username, room, createdtime});
        navigate("/", { replace: true });
    };

    return (
        <div className="border-r-4 border-sky-600 p-5">
            <h2 className="mb-10 capitalize text-xl text-white font-semibold">
                {room}
            </h2>

            <div>
                <h2 className="font-semibold text-white underline">User : </h2>
                <ul className="list-disc ml-5">
                    {roomUsers.map((u) => (
                        <li
                            className="text-orange-700 font-semibold text-lg"
                            key={u.id}
                        >
                            {u.username}
                        </li>
                    ))}
                </ul>
            </div>

            <button onClick={leaveRoom} className="text-xl font-bold text-red-600 py-1.5 px-2 hover:text-red-400 transition-all bg-slate-200 hover:bg-slate-400 rounded-md">
                Leave
            </button>
        </div>
    );
};

export default ChatroomUser;
