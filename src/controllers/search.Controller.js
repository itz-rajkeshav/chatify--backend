import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
const searchController = asyncHandler(async (req, res) => {
  const user = req.query.user;
  const regex = new RegExp(escapeRegex(user), "gi");

  const users = await User.find({ userName: regex }).select("userName");
  return res.json({ users });

  // return res.send("user found");
});
export default searchController;
