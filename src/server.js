import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { server } from "./app.js";
dotenv.config({
  path: "./.env",
});
connectDB()
  .then(() => {
    server.listen(process.env.PORT || 3000, () => {
      console.log(`server is running at the port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("mongoDB connection failed", error);
  });
