import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils//ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "ok",
  // });
  const { Name, gmail, password } = req.body;
  console.log("email", gmail);
  console.log("password", password);
  if (password === "") throw new ApiError(400, "password is required");
  if (Name === "") throw new ApiError(400, "name is required");
  if (gmail === "") throw new ApiError(400, "email is required");
  const existedUser = User.findOne({ gmail });
  if (existedUser)
    throw new ApiError(409, "user is already existed with this email Id");
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImagePath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImagePath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  const user = await User.create({
    Name,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    gmail,
  });
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while entering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User register successfully "));
});

export { registerUser };
