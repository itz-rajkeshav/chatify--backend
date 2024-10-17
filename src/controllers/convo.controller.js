import { ConvoUser } from "../models/conversation.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const ConvoMember = asyncHandler(async (req, res) => {
  const { ConvoStartUser, ReceivedUser } = req.body;
  console.log("ConvoStartUser:", ConvoStartUser, "ReceivedUser:", ReceivedUser);

  if (!ConvoStartUser || !ReceivedUser) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          "Missing required fields: ConvoStartUser or ReceivedUser"
        )
      );
  }

  try {
    const newConvo = new ConvoUser({
      ConvoStartUser,
      ReceivedUser,
    });

    const savedConvo = await newConvo.save();

    return res
      .status(201)
      .json(new ApiResponse(201, "Conversation member registered", savedConvo));
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json(new ApiResponse(400, "Validation failed", validationErrors));
  }
});

export { ConvoMember };
