import mongoose from "mongoose";
import {ApplicationModel} from "./application";
import {JobModel} from "./job";
import {UserModel} from "./user";

const User = mongoose.model("User", UserModel);
const Job = mongoose.model("Job", JobModel);
const Application = mongoose.model("Application", ApplicationModel);

export {
    Application,
    Job,
    User
}