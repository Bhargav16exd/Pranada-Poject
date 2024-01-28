import asyncHandler from "../utills/AsyncHandler.js"
import {ApiError} from "../utills/ApiError.js"
import {ApiResponse} from "../utills/ApiResponse.js"
import { User } from "../models/User.model.js"


const signUp = asyncHandler(async(req,res)=>{

    const {userName , password} = req.body

    if(!userName || !password){
        throw new ApiError(400 , "All fields are required")
    }

    const user = await User.findOne({userName})

    if(user){
        throw new ApiError(400, "User already exist")
    }

    const requestedUser = await User.create({
        userName,
        password
    })

    await requestedUser.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200 , "User Creation Success" , requestedUser) 
    )
})



export {
    signUp
}