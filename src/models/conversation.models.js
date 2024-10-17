import mongoose from "mongoose";
const convoschema = new mongoose.Schema(
  {
    ConvoType: {
      type: String,
      default: "One to One",
    },
    ConvoStartUser: {
      type: String,
      required: true,
    },
    ReceivedUser: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const ConvoUser = mongoose.model("ConvoUser", convoschema);
