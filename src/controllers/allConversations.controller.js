import { ConvoUser } from "../models/conversation.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const AllConvo = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  console.log(currentUser);

  // const conversations = await ConvoUser.find({}).populate("userData").exec();
  // to find the inside the model of the current id
  const conversations = await ConvoUser.find({
    userData: { $in: [currentUser._id] },
  })
    .populate("userData")
    .exec();
  if (conversations.length === 0 || !conversations) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Conversations not found or empty"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, conversations.length, conversations));
});
export { AllConvo };
