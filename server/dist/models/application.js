"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModel = void 0;
const mongoose_1 = require("mongoose");
const ApplicationModel = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    job: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Job"
    }
});
exports.ApplicationModel = ApplicationModel;
