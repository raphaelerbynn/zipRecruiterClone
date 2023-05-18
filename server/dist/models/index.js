"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Job = exports.Application = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const application_1 = require("./application");
const job_1 = require("./job");
const user_1 = require("./user");
const User = mongoose_1.default.model("User", user_1.UserModel);
exports.User = User;
const Job = mongoose_1.default.model("Job", job_1.JobModel);
exports.Job = Job;
const Application = mongoose_1.default.model("Application", application_1.ApplicationModel);
exports.Application = Application;
