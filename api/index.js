const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected !");
  socket.on("join", (roomId) => {
    socket.join(roomId);
    socket.emit("room_join", roomId);
  });
  socket.on("drawing", ({ roomId, data }) => {
    socket.to(roomId).emit("drawing", data);
  });
  socket.on("disconnection", () => {
    console.log("Client disconnected !");
  });
});

server.listen(8080, () => {
  console.log("Server running on the port 8080!");
});
