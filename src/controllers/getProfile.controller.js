import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ConvoUser } from "../models/conversation.models.js";
const getProfile=asyncHandler(async(req,res)=>{
const {convoId}=req.body;
// return res.json({userId});
const populatedConvo = await ConvoUser.findById(convoId)
      .populate("userData")
      .exec();
// console.log(user);

if(!convoId){
    return res
        .status(404)
        .json(new ApiResponse(404, "User id not found"));
}
return res.status(200).json(new ApiResponse(200,populatedConvo));
})
export {getProfile};