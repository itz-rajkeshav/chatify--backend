import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils//ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const generateAccessandRefreshToken = async (userId) => {
  try {
    //find user according to the id
    const user = await User.findById(userId);
    // generate access and refresh token
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    //save refresh token in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    // return also
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

// here we add the register
const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "ok",
  // });
  // here we take data from the user
  const { Name, gmail, password } = req.body;
  console.log("email", gmail);
  console.log("password", password);
  //check all the params
  if (password === "") throw new ApiError(400, "password is required");
  if (Name === "") throw new ApiError(400, "name is required");
  if (gmail === "") throw new ApiError(400, "email is required");
  // at the time of the register we check if user is  already register before or not
  const existedUser = await User.findOne({ gmail });
  if (existedUser)
    throw new ApiError(409, "user is already existed with this email Id");
  // here we all the stuffs regarding imgaes that we take at the time of the register
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImagePath = req.files?.coverImage[0]?.path;
  let coverImagePath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImagePath = req.files.coverImage[0].path;
  }
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  console.log(req.files);
  //here we upload the pic in the cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImagePath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  // in the format we store in the cloudinary
  const user = await User.create({
    Name,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    gmail,
    password,
  });
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while entering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User register successfully "));
});

//after register we check login

const loginUser = asyncHandler(async (req, res) => {
  //we check through the gmail and the password
  // here we take both fields from registter user
  const { gmail, password } = req.body;
  if (!gmail) {
    throw new ApiError(400, "gmail is required");
  }
  // we find the gmail in the db
  const user = await User.findOne({ gmail });
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }
  // here we check the password id i.e valid or not
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user password credential");
  }
  //access and refreshToken
  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id
  );
  //send by removing the password and the refresh token
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  //send cookie
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const loggedOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User looged out successfully"));
});

export { registerUser, loginUser, loggedOutUser };
