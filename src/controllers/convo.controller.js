import { ConvoUser } from "../models/conversation.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const CreateConvo = asyncHandler(async (req, res) => {
  const { ConvoStartUser, ReceivedUser } = req.body;
  console.log(ConvoStartUser, ReceivedUser);

  if (!ConvoStartUser || !ReceivedUser) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "Missing fields: ConvoStartUser or ReceivedUser")
      );
  }
  try {
    const existingConvo = await ConvoUser.findOne({
      userData: { $all: [ConvoStartUser, ReceivedUser] },
    }).populate("userData");

    if (existingConvo) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, "Conversation already exists", existingConvo)
        );
    }
    const newConvo = new ConvoUser({
      startUserId: ConvoStartUser,
      userData: [ConvoStartUser, ReceivedUser],
    });

    const savedConvo = await newConvo.save();

    const populatedConvo = await ConvoUser.findById(savedConvo._id)
      .populate("userData")
      .exec();

    return res.status(201).json(new ApiResponse(

      201,
      "Conversation member registered",
      populatedConvo,
    )
      );
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json(new ApiResponse(400, "Validation failed", validationErrors));
  }
});

export { CreateConvo };
