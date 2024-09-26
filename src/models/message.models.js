import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    receiverName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export const Message = mongoose.model("Message", messageSchema);
