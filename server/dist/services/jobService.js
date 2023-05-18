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
exports._getJobBySearch = exports._getOneJob = exports._updateJob = exports._getAllJobs = exports._deleteJob = exports._createJob = void 0;
const models_1 = require("../models");
const _getAllJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Job.find();
});
exports._getAllJobs = _getAllJobs;
const _getJobBySearch = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const querySearch = {};
    if (query.title) {
        querySearch.title = { $regex: query.title, $options: "i" };
    }
    if (query.location) {
        querySearch.location = { $regex: query.location, $options: "i" };
    }
    if (query.experience) {
        querySearch.experience = query.experience;
    }
    return yield models_1.Job.find({
        $and: [querySearch]
    }).populate("recruiter");
});
exports._getJobBySearch = _getJobBySearch;
const _getOneJob = (job_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Job.findById(job_id);
});
exports._getOneJob = _getOneJob;
const _createJob = (jobData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Job.create(jobData);
});
exports._createJob = _createJob;
const _updateJob = (jobData, job_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Job.updateOne({ _id: job_id }, jobData);
});
exports._updateJob = _updateJob;
const _deleteJob = (job_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Job.deleteOne({ _id: job_id });
});
exports._deleteJob = _deleteJob;
