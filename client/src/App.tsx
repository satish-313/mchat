import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { io } from "socket.io-client";
import Chat from "./pages/Chat";
import Home from "./pages/Home";

// const socket = io("http://localhost:4000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  // const navigate = useNavigate();

  const setName = (s: string) => {
    setUsername(s);
  };

  const setroom = (r: string) => {
    setRoom(r);
  };

  const joinRoom = () => {
    // socket.emit("joinRoom", { username, room });
    console.log(username, room);
    // navigate("/chat");
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
              joinroom={joinRoom}
              setRoom={setroom}
              room={room}
            />
          }
        />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
