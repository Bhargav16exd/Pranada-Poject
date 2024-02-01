import mongoose from "mongoose"

const casePaperSchema = new mongoose.Schema({

    Present_Complain:{
        type:String
    },
    Know_Case_Of:{
        type:String
    },
    Current_Treatment:{
        type:String
    },
    Past_Diseases:{
        type:String
    },
    Past_Operations:{
        type:String
    },
    Pregnancy_History:{
        type:String
    },
    Family_History:{
        type:String
    },
    Pulse:{
        type:String
    },
    Mal:{
        type:String
    },
    Mutra:{
        type:String
    },
    Menstrual_Cycle:{
        type:String
    },
    Sleep:{
        type:String
    },
    Weight:{
        type:Number
    },
    BP:{
        type:Number
    },
    Height:{
        type:String
    },
    Sleep_Details:{
        Sleep_At : {type:String},
        Wakeup_At : {type:String}
    },
    Addictions:{
        type:String,
        enum:["SOMKING","DRINKING","TOBACCO","PANMASALA","DRUG"]
    },
    Tea: { type:String },
    Milk: { type:String },
    Food_Timings:{
        BreakFast: {type:String},
        Lunch: {type:String},
        Dinner: {type:String}
    },
    Eating_Habits:{
        Vegitable: {type:String},
        Bakery_Products: {type:String},
        Hoteling: {type:String},
        NonVeg: {type:String},
        Left_Over_Food: {type:String},
        Fruits: {type:String},
        Fast:{type:String}
    },
    Tastes:{
        Sweet:{type:String},
        Sour:{type:String},
        Salty:{type:String},
        Bitterness:{type:String},
        Spicyness:{type:String},
    }
    
    

},{timestamps:true})

export const Casepaper = mongoose.model("Casepaper",casePaperSchema)