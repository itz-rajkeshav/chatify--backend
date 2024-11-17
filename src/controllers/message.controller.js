import { Message } from "../models/message.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const registerMessage = asyncHandler(async (req, res) => {
  try {
    const { message,sender,receiver,convoId,isDeleted } = req.body;
    console.log(message,sender,receiver,convoId,isDeleted);
    const newMessage = new Message({
      message,
      sender,
      receiver,
      convoId,
      isDeleted: isDeleted || false,
    });
    await newMessage.save();
    return res
      .status(201)
      .json(new ApiResponse(200, "Message saved successfully", newMessage));
  } catch (error) {
    return new ApiError(500, "Failed to saved messages", error);
  }
});
export { registerMessage };
