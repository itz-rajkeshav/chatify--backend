import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import router from "./routes/user.routes";
// import userRouter from "./routes/user.routes";
import userRoutes from "./routes/user.routes.js";
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

//routes decleration
app.use("/api/v1/users", userRoutes);
export { app };
