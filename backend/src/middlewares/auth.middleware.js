import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  jwt  from "jsonwebtoken";


export const verifyJWT = asyncHandler(async(req, res, next) => {
  try {
    const authHeader = req.headers.Authorization || req.headers.authorization;
  
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(401, "unauthorized request")
    }

    const token = authHeader.split(' ')[1]

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
  
    if (!user) {
      throw new ApiError(401, "unauthorized request");
    }
  
    req.user = user;
    next()

  } catch (error) {
    throw new ApiError(403, "forbidden")
  }

})