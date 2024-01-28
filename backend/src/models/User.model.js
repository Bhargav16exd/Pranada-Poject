import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
       type:String,
       required:true,
       enum:[ "DOCTOR" , "CLERK" ],
       default:"CLERK"
    }

},{
    timestamps:true
})

userSchema.pre("save",async function(next){
   
    if(!this.isModified("password")) return next()
    
    this.password = await bcrypt.hash(this.password,10)

    next()

})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.createAccessToken = function(){
 
    return jwt.sign({
        _id : this._id,
        userName:this.userName,
        role:this.role
    },
     process.env.JWT_SECRET_KEY,
    {
      expiresIn:process.env.JWT_EXPIRY     
    })

}

export const User = mongoose.model("User" , userSchema)