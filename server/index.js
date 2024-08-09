const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors"); // Add this line to include CORS

const app = express();
const server = http.createServer(app);
app.use(cors()); // Enable CORS for all routes

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from your Vite server
    methods: ["GET", "POST"],
  },
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.broadcast.emit("chat message", "user entered chat");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    socket.broadcast.emit("chat message", "user left the chat");
  });
  // server receives message
  socket.on("chat message", (msg) => {
    //server broadcasts to the client
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
