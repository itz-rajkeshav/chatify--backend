import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import { registerMessage } from "./controllers/message.controller.js";
import profileRoute from "./routes/profile.routes.js";
import _logger from "pino-http";
import searchRoute from "./routes/search.routes.js";
import ConvoMemberRoute from "./routes/convo.routes.js";

const logger = _logger();
const app = express();
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
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users", registerMessage);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/search", searchRoute);
app.use("/api/v1/convoMember", ConvoMemberRoute);
export { app };
