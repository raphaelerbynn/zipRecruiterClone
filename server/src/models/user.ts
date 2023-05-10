import { Schema } from "mongoose";


const UserModel = new Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["recruiter", "candidate"],
        require: true
    }
});


export {UserModel};