import { Message } from "../models/message.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const registerMessage = asyncHandler(async (req, res) => {
  try {
    const { senderName, receiverName, message, isDeleted } = req.body;
    console.log(senderName, receiverName, message, isDeleted);
    const newMessage = new Message({
      senderName,
      receiverName,
      message,
      isDeleted: isDeleted || false,
    });
    await newMessage.save();
    // console.log(newMessage);
    return res
      .status(201)
      .json(new ApiResponse(200, "Message saved successfully", newMessage));
  } catch (error) {
    return new ApiError(500, "Failed to saved messages", error);
  }
});
export { registerMessage };
