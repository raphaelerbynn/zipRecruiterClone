import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/";
const database = "zipRecuiter"

const dbConnect = mongoose.connect(`${uri}${database}`);


export default dbConnect;