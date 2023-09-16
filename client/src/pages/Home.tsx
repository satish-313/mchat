import React from "react";
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";

type props = {
  username: string;
  room: string;
  setName: (s: string) => void;
  setRoom: (r: string) => void;
  socket: Socket;
};

const Home: React.FC<props> = ({
  username,
  room,
  setName,
  setRoom,
  socket,
}) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", { username, room });
      navigate("/chat");
    }
  };

  return (
    <div className="h-screen bg-pink-700 p-10">
      <div className="mx-auto max-w-3xl bg-pink-400 rounded-lg flex flex-col px-3 py-5 space-y-5 justify-center items-center">
        <h1 className="w-36">{`<>Dev Rooms</>`}</h1>

        <input
          type="text"
          placeholder="UserName"
          className="rounded w-2/3 h-10 px-3"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="rounded w-2/3 h-10 px-3"
          onChange={(e) => setRoom(e.target.value)}
        >
          <option> -- Select Room --</option>
          <option value="javascript">Javascript</option>
          <option value="nodejs">Nodejs</option>
          <option value="express">express</option>
          <option value="reactjs">Reactjs</option>
        </select>

        <button
          onClick={joinRoom}
          className="border px-3 py-1.5 rounded bg-gray-500 text-sm font-semibold text-yellow-50 hover:bg-gray-700 transition-all"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
