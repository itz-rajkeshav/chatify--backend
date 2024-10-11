import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const profileController = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log(user);
  return res.json(new ApiResponse(200, user));
});
export default profileController;
