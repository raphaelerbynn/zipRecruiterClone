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
        enum: ["Remote", "In Person", "Hybrid"],
        default: "In Person"
    },
    company: String,
    min: {
        type: Number,
        index: true,
        require: true
    },
    max: Number,
    currency: {
        type: String,
        index: true,
        require: true
    },
    frequency: {
        type: String,
        index: true,
        require: true
    },
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});


export {JobModel};