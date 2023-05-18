"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const getAllJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield (0, services_1._getAllJobs)();
        res.json(jobs);
    }
    catch (err) {
        next(err);
    }
});
const getOneJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.job_id;
    try {
        const job = yield (0, services_1._getOneJob)(jobId);
        if (!job) {
            res.status(404);
            throw Error("Job not found");
        }
        res.json(job);
    }
    catch (err) {
        next(err);
    }
});
const createJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobData = req.body;
    const user = req.params.user;
    const job = Object.assign(Object.assign({}, jobData), { recruiter: user._id });
    try {
        console.log(job);
        yield (0, services_1._createJob)(job);
        if (user.role !== "recruiter") {
            res.status(403);
            throw Error("User not authorized");
        }
        res.status(201).json(job);
    }
    catch (err) {
        next(err);
    }
});
const updateJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobData = req.body;
    const jobId = req.params.job_id;
    const user = req.params.user;
    try {
        const job = yield (0, services_1._getOneJob)(jobId);
        if (!job) {
            res.status(404);
            throw Error("Job not found");
        }
        if (user.role !== "recruiter") {
            res.status(403);
            throw Error("User not authorized");
        }
        //console.log(typeof recruiter._id + "====" + typeof job.recruiter);
        if (String(user._id) !== String(job.recruiter)) {
            res.status(409);
            throw Error("Unauthorized");
        }
        yield (0, services_1._updateJob)(jobData, jobId);
        res.status(200).send("Job updated successfully");
    }
    catch (err) {
        next(err);
    }
});
// search by title, experience and location
const searchJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    try {
        console.log(">>>>>>>>>" + query);
        if (!query) {
            throw Error("Nothing to search");
        }
        const jobs = yield (0, services_1._getJobBySearch)(query);
        res.json(jobs);
    }
    catch (err) {
        next(err);
    }
});
const deleteJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.job_id;
    const user = req.params.user;
    try {
        const job = yield (0, services_1._getOneJob)(jobId);
        if (!job) {
            res.status(404);
            throw Error("Job not found");
        }
        if (user.role !== "recruiter") {
            res.status(403);
            throw Error("User not authorized");
        }
        if (String(user._id) !== String(job.recruiter)) {
            res.status(409);
            throw Error("Unauthorized");
        }
        yield (0, services_1._deleteJob)(jobId);
        res.status(200).send("Job deleted");
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
    getOneJob,
    searchJob
};
