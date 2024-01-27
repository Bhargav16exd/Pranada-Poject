import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();


app.use(cookieParser())
app.use(urlencoded({extended:true}))
app.use(cors({
    origin:process.env.CORS_ALLOW_ORIGIN
}))
app.use(express.static("public"))
app.use(express.json({
    limit:"50kb"
}))

app.get("/",(req,res)=>{
    res.json("SUCCESS")
})




// Error Handler 

app.use((err,req,res)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Something Went Wrong"
    const error = err.errors || []

    res.status(statusCode).json({
        success:false,
        message,
        error,
        data:null
    })
})

export default app;
