import { Patient } from "../models/patient.model.js";
import { ApiError } from "../utills/ApiError.js";
import { ApiResponse } from "../utills/ApiResponse.js";
import asyncHandler from "../utills/AsyncHandler.js";



const createPatientProfile = asyncHandler(async(req,res)=>{

    const {name , age , contact , address ,occupation , RegistrationDate , gender} = req.body

    if(!name || !RegistrationDate || !gender){
        throw new ApiError(400,"ALL FIELDS ARE required")
    }

    const patient = await Patient.create({
        name:name,
        Age:age || "NOT SPECIFIED",
        address:address || "",
        RegistrationDate:RegistrationDate,
        Contact:contact || "",
        Gender:gender,
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

    if(!patient){
        throw new ApiError(400,"No Patient Exist")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Patient Details Fetched Successfully",patient)
    )
})


const updateProfile = asyncHandler(async(req,res)=>{

    const {id} = req.params
    const {name , age , contact , address ,occupation , gender} = req.body

    if(!id){
        throw new ApiError(400,"Invalid Request")
    }

    const patient = await Patient.findByIdAndUpdate(id,{
        name:name,
        Age:age,
        address:address,
        Occupation:occupation,
        contact:contact,
        Gender:gender
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