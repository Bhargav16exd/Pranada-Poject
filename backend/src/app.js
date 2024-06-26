import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.router.js"
import patientRoutes from "./routes/patient.router.js"
import bodyParser from "body-parser"

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
app.use(bodyParser.json())


// Routes

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/patient", patientRoutes)


// Error Handler 

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Something Went Wrong"
    const error = err.errors || []

    res.status(statusCode).json({
        success:false,
        message,
        error,
        data:null
    })

    next()
})

export default app;
