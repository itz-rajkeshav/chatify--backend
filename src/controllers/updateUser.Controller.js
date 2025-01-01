import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const updateUser=asyncHandler(async(req,res)=>{
    const {Id,Name,gmail,Status,location} = req.body;
    if (!Id) {
        return res.status(400).json(new ApiResponse(400, "User ID is required"));
    }
    const updateField={};
    if(Name)
    {updateField.Name=Name;}
    if(gmail)
      {updateField.gmail=gmail;}
    if(Status)
      {updateField.Status=Status;}
    if (location) 
      {updateField.location = location;}
    if (req.files?.avatar?.[0]) {
    const avatar = await uploadOnCloudinary(req.files.avatar[0].buffer);
    if (avatar) {
      updateField.avatar = avatar.url;
  }
}
if (req.files?.coverImage?.[0]) {
  const coverImage = await uploadOnCloudinary(req.files.coverImage[0].buffer);
  if (coverImage) {
      updateField.coverImage = coverImage.url;
  }
}
const updatedUser = await User.findByIdAndUpdate(
  Id,
  {
      $set: updateField
  },
  {
      new: true, 
  }
).select("-password");
    return res.status(200).json(new ApiResponse(200,updatedUser,"user udated successfully"));
})
export {updateUser};