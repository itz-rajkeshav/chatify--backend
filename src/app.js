import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import { registerMessage } from "./controllers/message.controller.js";
import profileRoute from "./routes/profile.routes.js";
import _logger from "pino-http";
import searchRoute from "./routes/search.routes.js";
import ConvoMemberRoute from "./routes/convo.routes.js";
import Allconversation from "./routes/allConvo.routes.js";
import getProfile from "./routes/getProfile.routes.js";
import getMessage from "./routes/getMessage.routes.js"
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
const logger = _logger();
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN||'http://localhost:3000', 
        methods: ['GET', 'POST'],
    },
});
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// app.use(logger);
//routes decleration
app.get("/",(req,res)=>res.json({status:"online"}))
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users", registerMessage);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/search", searchRoute);
app.use("/api/v1/convoMember", ConvoMemberRoute);
app.use("/api/v1/allConvo", Allconversation);
app.use("/api/v1/getProfile", getProfile);
app.use("/api/v1/getMessages",getMessage);
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    io.emit('receiveMessage', message); 
});
socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
});
});
export { server };
