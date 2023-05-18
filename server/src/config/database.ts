import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const uri = process.env.DATABASE_URI;
const database = process.env.DATABASE_NAME;

const dbConnect = mongoose.connect(`${uri}${database}`);


export default dbConnect;