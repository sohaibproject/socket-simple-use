import { useEffect, useState } from "react";
import "./App.css";
import { io, Socket } from "socket.io-client";
import { join } from "path";
const App = () => {
  // const socket: Socket = io.connect("http://localhost:4444");
  const socket: Socket = io("https://push-notification.logistix-dz.com/");
  const [massage, setMassage] = useState<string>("");
  const [reciveMassage, setReciveMassage] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const sendMessage = () => {
    socket.emit("send_message", { massage, room });
  };
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("recive_message", (data) => {
       setReciveMassage(data.massage);
    });
  }, [socket]);

  return (
    <div className="App">
      <h2> hello in socket Io</h2>

      <div>
        <input name="room" onChange={(e) => setRoom(e.target.value)} type="text" />
        <button onClick={joinRoom}> Join Room</button>
      </div>

      <div>
        <input name="message" onChange={(e) => setMassage(e.target.value)} type="text" />
        <button onClick={sendMessage}> Send Message</button>
      </div>

      <div>
        <span>message : {reciveMassage} </span>
      </div>
    </div>
  );
};

export default App;
