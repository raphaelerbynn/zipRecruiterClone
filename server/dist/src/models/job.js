"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = require("mongoose");
const JobModel = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
});
exports.JobModel = JobModel;
