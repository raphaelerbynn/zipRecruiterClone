import { Schema } from "mongoose";


const ApplicationModel = new Schema({
    coverLetter: {
        type: String,
        require: true
    },
    resume: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ["pending", "shortlisted", "rejected"],
        default: "pending"
    },
    candidate: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: "Job"
    }
});

export {ApplicationModel}