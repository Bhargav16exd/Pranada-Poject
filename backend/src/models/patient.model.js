import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    contact:{
        type:Number,
    },
    Occupation:{
        type:String
    },
    Gender:{
        type:String,
        enum:["MALE","FEMALE","NONBINARY"]
    },
    RegistrationDate:{
        type:Date,
        required:true
    },
    Age:{
        type:Number
    },
    Casepaper:{
        type:mongoose.Types.ObjectId,
        ref:"CASEPAPER"
    }

},{timestamps:true})

export const Patient = mongoose.model("Patient",patientSchema)