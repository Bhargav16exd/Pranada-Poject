import asyncHandler from "../utills/AsyncHandler.js"
import {ApiError} from "../utills/ApiError.js"
import {ApiResponse} from "../utills/ApiResponse.js"
import { User } from "../models/User.model.js"

async function generateAccessToken(userId){
    try {

        const user = await User.findById(userId) 
        const accessToken = await user.createAccessToken()
        return accessToken;
        
    } catch (error) {
        console.log(error)
        throw new ApiError(500 , "Internal server Error")
    }
}

// User Creation API Controller

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

// User Login API controller

const login = asyncHandler(async(req,res)=>{

    const {userName , password} = req.body 

    if(!userName || !password){
        throw new ApiError(400 , "All fields are required")
    }
    
    const findExistingUser = await User.findOne({userName}).select("password")

    if(!findExistingUser){
        throw new ApiError(400,"No Such User exist")
    }

    const result = await findExistingUser.comparePassword(password)

    if(!result){
        throw new ApiError(400 , "Wrong Password Entered")
    }

    const accessToken = await generateAccessToken(findExistingUser._id)
    const user = await User.findById(findExistingUser._id)

    console.log(accessToken)

    const COOKIE_OPTIONS = {
        httpOnly:true,
        secure:true
    }

    return res
    .cookie("ACCESS_TOKEN",accessToken,COOKIE_OPTIONS)
    .json(
        new ApiResponse(200 ,"User Login Success" , {user , accessToken})
    )
})

const profile = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user?._id)

    console.log(req.user)

    return res
    .status(200)
    .json(
        new ApiResponse(200,"User Fetched Success", user)
    )
})

// ADMIN based user password change

const changePassword =  asyncHandler(async(req,res)=>{

    // Check Whether user is ADMIN 
    // Get userName and new Password of account he want to change password
    // check for user associated with that userName
    // get the User
    // set new password 

    const {userName , newPassword} = req.body

    if(!userName || !newPassword){
        throw new ApiError(400,"All Fields are required")
    }

    const user = await User.findOne({userName}).select("+password")

    if(!user){
        throw new ApiError(400 , "No Such User Exists")
    }

    user.password = newPassword 
    await user.save()
    
   return res
   .status(200)
   .json(
      new ApiResponse(200 , "Password Changed Successfully")
   )
    
})

// ADMIN based user role change

const changeRole = asyncHandler(async(req,res)=>{

    const {userName , newRole} = req.body

    if(!userName || !newRole){
        throw new ApiError(400,"All fields are required")
    }

    const user = await User.findOneAndUpdate({userName},{
        role:newRole
    }, {new:true})
    

    if(!user){
        throw new ApiError(400 , "No User Exist with UserName")
    }

    await user.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200 , "User Role Change Success" , user)
    )
})



export {
    signUp,
    login,
    profile,
    changePassword,
    changeRole
}