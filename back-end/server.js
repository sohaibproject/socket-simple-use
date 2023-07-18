const cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const socket = require("socket.io");
const http = require("http");
const { Server } = socket;
///
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5555",
    methods: ["GET", "DELETE", "PUT", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log("room",data);
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    console.log( data);
    // socket.broadcast.emit("recive_message",data)
    socket.to(data.room).emit("recive_message", data);
  });
});
const PORT = process.env.PORT || 4444;

app.get("/", async (req, res) => {
  res.json("hello world");
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
