import { Message } from "../models/message.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getMessage=asyncHandler(async(req,res)=>{
    const {convoId}=req.body;
    const data=await Message.find({convoId})
    if(!convoId){
        return res.status(404).json(new ApiResponse(404,"convoId not found"));
    }
    console.log(convoId);
    return res.status(200).json(new ApiResponse(200,data))
})
export {getMessage};