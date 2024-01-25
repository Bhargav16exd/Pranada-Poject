import app from "./app.js"
import dotenv from "dotenv"
import connectToDatabase from "./db/dbConnection.js"

dotenv.config({
    path:'./.env'
})

connectToDatabase()

.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Sever is UP and Running on PORT ${process.env.PORT}`)
    })
})
.catch((err)=>{
   console.log("ERROR",err)
})