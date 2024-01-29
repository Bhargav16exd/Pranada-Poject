import jwt from "jsonwebtoken"
import asyncHandler from "../utills/AsyncHandler.js"
import { ApiError } from "../utills/ApiError.js"
import { User } from "../models/User.model.js"

const authMiddleware = asyncHandler(async(req,res,next)=>{

    try {
        
            const token = req.cookies?.ACCESS_TOKEN 
        
            if(!token){
                throw new ApiError(400,"Kindly Login")
            }

            // Verfication of and retrival of content in cookies
        
            const data = jwt.verify( token,process.env.JWT_SECRET_KEY )
        
            const user = await User.findById(data._id)
        
            if(!user){
                throw new ApiError(400, "No Such user exist")
            }

            console.log(user)
        
            req.user = user;
        
            next();

    } catch (error) {
        console.log(error)
    }

})

const isAdmin = asyncHandler(async(req,res,next)=>{
 
    if(req?.user.role == "ADMIN"){
        next()
    }
    else
    {
        throw new ApiError(400,"Not Authorized")
    }

})

export {
    authMiddleware,
    isAdmin
}