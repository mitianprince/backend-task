const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");

const userRoutes = require("./routes/User");
const postRoutes = require("./routes/Post");
const commentRoutes = require("./routes/Comment");

const app = express();
const server = http.createServer(app); // Use http server
const io = new Server(server, {
              cors: {
                            origin: "*", // Allow all origins (adjust as per your requirements)
                            methods: ["GET", "POST"],
              },
});

// MongoDB connection
mongoose
              .connect(process.env.MONGOURL)
              .then(() => console.log("Database connected"))
              .catch((err) => console.error("Database connection failed:", err));

// Middleware
app.use(
              fileUpload({
                            useTempFiles: true,
                            tempFileDir: "/tmp/",
              })
);
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("<h2>Welcome to the Social Media API App</h2>");
});
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/user", userRoutes);

// Socket.IO Setup
const connectedUsers = {}; // Store connected users

io.on("connection", (socket) => {
              console.log(`User connected: ${socket.id}`);

              // Handle user registration
              socket.on("register", (userId) => {
                            connectedUsers[userId] = socket.id;
                            console.log(`User ${userId} registered with socket ${socket.id}`);
              });

              // Handle sending and receiving messages
              socket.on("sendMessage", ({ senderId, receiverId, message }) => {
                            const receiverSocketId = connectedUsers[receiverId];
                            if (receiverSocketId) {
                                          io.to(receiverSocketId).emit("receiveMessage", { senderId, message });
                            }
              });

              // Notify users on new comments
              socket.on("newComment", ({ postOwnerId, comment }) => {
                            const ownerSocketId = connectedUsers[postOwnerId];
                            if (ownerSocketId) {
                                          io.to(ownerSocketId).emit("notification", {
                                                        type: "comment",
                                                        message: `New comment: ${comment}`,
                                          });
                            }
              });

              // Handle disconnection
              socket.on("disconnect", () => {
                            for (const userId in connectedUsers) {
                                          if (connectedUsers[userId] === socket.id) {
                                                        delete connectedUsers[userId];
                                                        break;
                                          }
                            }
                            console.log(`User disconnected: ${socket.id}`);
              });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
              console.log(`Server is running on port ${PORT}`);
});
