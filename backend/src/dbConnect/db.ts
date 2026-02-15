
import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"; 
 
const connectDB = async (): Promise<void> => { 
    try { 
        const connectionInstance: mongoose.Mongoose = await mongoose.connect( 
            `${process.env.MONGODB_URL}/${DB_NAME}` 
        ); 
 
        console.log( 
            `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}` 
        ); 
    } catch (error: unknown) { 
        if (error instanceof Error) { 
            console.error("MONGODB connection FAILED", error.message); 
        } else { 
            console.error("MONGODB connection FAILED", error); 
        } 
        process.exit(1); 
    } 
}; 
 
export default connectDB; 
