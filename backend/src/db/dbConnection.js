import mongoose from "mongoose"

const connectToDatabase = async () =>{
    try {

      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
      console.log(`DB Connected to : ${connectionInstance.connection.host}`);
        
    } catch (error) {
     
        console.log("ERROR WHILE CONNECTING TO DATABASE" , error)
        process.exit(1);
    }
}

export default connectToDatabase