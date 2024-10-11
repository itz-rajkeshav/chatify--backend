import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    gmail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password must be required"],
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      //coludinary
      type: String,
      required: true,
    },
    coverImage: {
      //cloudinary
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// means we will encoded the user information in the access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.isPasswordCorrect = async function (password) {
  console.log(password, this);
  if (!password) {
    throw new Error("Password not provided");
  }
  if (!this.password) {
    throw new Error("Stored password hash is missing");
  }
  return await bcrypt.compare(password, this.password);
};
export const User = mongoose.model("User", userSchema);
