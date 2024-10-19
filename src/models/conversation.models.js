import mongoose from "mongoose";
const convoschema = new mongoose.Schema(
  {
    ConvoType: {
      type: String,
      default: "Single",
    },
    startUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userData: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
export const ConvoUser = mongoose.model("ConvoUser", convoschema);
