import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { io } from "socket.io-client";
import Chat from "./pages/Chat";
import Home from "./pages/Home";

const socket = io("http://localhost:4040");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const setName = (s: string) => {
    setUsername(s);
  };

  const setroom = (r: string) => {
    setRoom(r);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              username={username}
              setName={setName}
              setRoom={setroom}
              room={room}
              socket={socket}
            />
          }
        />
        <Route path="/chat" element={<Chat
          username={username}
          room = {room}
          socket = {socket}
        />} />
      </Routes>
    </Router>
  );
}

export default App;
