import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`srver is running at the port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("mongoDB connection failed", error);
  });
