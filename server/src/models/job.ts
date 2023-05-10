import { Schema } from "mongoose";


const JobModel = new Schema({
    title: {
        type: String,
        index: true,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    location: {
        type: String,
        index: true,
        require: true
    },
    experience: {
        type: Number,
        index: true,
        require: true
    },
    type: {
        type: String,
        enum: ["remote", "on-site"],
        default: "on-site"
    },
    company: String,
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});


export {JobModel};