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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getApplications = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.job_id;
    const user = req.params.user;
    try {
        const job = yield (0, services_1._getOneJob)(jobId);
        if (!job) {
            res.status(404);
            throw Error("Job not found");
        }
        let applications;
        if (user.role === "candidate") {
            applications = yield (0, services_1._getMyApplication)(jobId, user._id);
            res.json(applications);
        }
        else {
            if (String(user._id) !== String(job.recruiter)) {
                res.status(409);
                throw Error("Unauthorized");
            }
            applications = yield (0, services_1._getAllApplications)(jobId);
            res.json(applications);
        }
    }
    catch (err) {
        next(err);
    }
});
const getAllApplicationsForCandidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.params.user;
    try {
        let applications;
        if (user.role === "candidate") {
            applications = yield (0, services_1._getAllApplicationsForCandidate)(user._id);
            res.json(applications);
        }
        else {
            res.status(409);
            throw Error("Unauthorized");
        }
    }
    catch (err) {
        next(err);
    }
});
const getAllApplicationsForRecruiter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.params.user;
    try {
        let applications;
        if (user.role === "recruiter") {
            applications = yield (0, services_1._getAllApplicationsForRecruiter)(user._id);
            res.json(applications);
        }
        else {
            res.status(409);
            throw Error("Unauthorized");
        }
    }
    catch (err) {
        next(err);
    }
});
const getOneApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.job_id;
    const applicationId = req.params.apply_id;
    const user = req.params.user;
    try {
        const job = yield (0, services_1._getOneJob)(jobId);
        if (!job) {
            res.status(404);
            throw Error("Job not found");
        }
        let application;
        if (user.role === "candidate") {
            application = yield (0, services_1._getMyApplication)(jobId, user._id);
            res.json(application);
        }
        else {
            if (String(user._id) !== String(job.recruiter)) {
                res.status(409);
                throw Error("Unauthorized");
            }
            application = yield (0, services_1._getOneApplication)(applicationId);
            res.json(application);
        }
    }
    catch (err) {
        next(err);
    }
});
const apply = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.job_id;
    const user = req.params.user;
    const { resume, coverLetter } = req.files;
    const applicationData = {
        resume: resume[0].filename,
        coverLetter: coverLetter[0].filename,
        job: jobId,
        candidate: user._id
    };
    try {
        const job = yield (0, services_1._getOneJob)(jobId);
        if (!job) {
            res.status(404);
            throw Error("Job not found");
        }
        if (user.role !== "candidate") {
            res.status(403);
            throw Error("User not authorized");
        }
        const application = yield (0, services_1._getMyApplication)(jobId, user._id);
        console.log(application);
        if (application) {
            res.status(409);
            throw Error("Already applied");
        }
        yield (0, services_1._createApplication)(applicationData);
        res.status(201).send("Job applied successfully");
    }
    catch (err) {
        next(err);
    }
});
const updateApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationId = req.params.apply_id;
    const jobId = req.params.job_id;
    const user = req.params.user;
    try {
        const job = yield (0, services_1._getOneJob)(jobId);
        if (!job) {
            res.status(404);
            throw Error("Job not found");
        }
        const application = yield (0, services_1._getOneApplication)(applicationId);
        if (!application) {
            res.status(404);
            throw Error("Application not found");
        }
        if (user.role === "recruiter") {
            if (user._id !== String(job.recruiter)) {
                res.status(403);
                throw Error("User not authorized");
            }
            const updatedApplication = {
                status: req.body.status
            };
            yield (0, services_1._updateApplication)(updatedApplication, applicationId);
            res.send("application status updated");
        }
        else {
            const updatedApplication = Object.assign(Object.assign({}, req.body), { status: application.status });
            yield (0, services_1._updateApplication)(updatedApplication, applicationId);
            res.status(200).send("Application updated");
        }
    }
    catch (err) {
        next(err);
    }
});
const deleteApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationId = req.params.apply_id;
    const user = req.params.user;
    try {
        const application = yield (0, services_1._getOneApplication)(applicationId);
        if (!application) {
            res.status(404);
            throw Error("Application not found");
        }
        //console.log(typeof user._id)
        if (user.role !== "candidate" && user._id !== String(application.candidate)) {
            res.status(403);
            throw Error("User not authorized");
        }
        const resumePath = path_1.default.join("uploads", application.resume);
        const coverLetterPath = path_1.default.join("uploads", application.coverLetter);
        fs_1.default.unlink(resumePath, err => {
            if (err) {
                console.log(err);
            }
        });
        fs_1.default.unlink(coverLetterPath, err => {
            if (err) {
                console.log(err);
            }
        });
        yield (0, services_1._deleteApplication)(applicationId);
        res.status(200).send("Application deleted");
    }
    catch (err) {
        next(err);
    }
});
const downloadFile = (req, res, next) => {
    const { filename } = req.params;
    const filePath = path_1.default.join("uploads", filename);
    res.download(filePath, err => {
        if (err) {
            console.log(err);
            res.status(404).json({ error: 'File not found' });
        }
    });
};
exports.default = {
    getApplications,
    apply,
    updateApplication,
    deleteApplication,
    getOneApplication,
    downloadFile,
    getAllApplicationsForCandidate,
    getAllApplicationsForRecruiter
};
