import { Patient } from "../models/patient.model.js";
import { ApiError } from "../utills/ApiError.js";
import { ApiResponse } from "../utills/ApiResponse.js";
import asyncHandler from "../utills/AsyncHandler.js";



const createPatientProfile = asyncHandler(async(req,res)=>{

    const {name , age , contact , address ,occupation , RegistrationDate , gender} = req.body

    if(!name || !RegistrationDate){
        throw new ApiError(400,"Name and Registration Date is required")
    }

    const patient = await Patient.create({
        name:name,
        Age:age || "",
        address:address || "",
        RegistrationDate:RegistrationDate,
        Contact:contact || "",
        gender:gender || "",
        Occupation:occupation || ""
    })

    await patient.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Patient Profile Created Succesfully",patient)
    )

})

const deletePatientProfile = asyncHandler(async(req,res)=>{

    const {id} = req.params

    if(!id){
        throw new ApiError(400,"Invalid Request")
    }

    await Patient.findByIdAndDelete(id)

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Patient Profile Deleted Successfully")
    )
})

const patientProfile = asyncHandler(async(req,res)=>{
  
    const {id} = req.params
    
    if(!id){
        throw new ApiError(400,"Invalid Request")
    }

    const patient = await Patient.findById(id)

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Patient Details Fetched Successfully",patient)
    )
})


const updateProfile = asyncHandler(async(req,res)=>{

    const {id} = req.params
    const {name , age , contact , address ,occupation } = req.body

    if(!id){
        throw new ApiError(400,"Invalid Request")
    }

    const patient = await Patient.findByIdAndUpdate(id,{
        name:name,
        Age:age,
        address:address,
        Occupation:occupation,
        contact:contact
    },
    { new:true })

    await patient.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Patient Profile Updated Successfully",patient)
    )
})

export {
    patientProfile,
    createPatientProfile,
    deletePatientProfile,
    updateProfile
}