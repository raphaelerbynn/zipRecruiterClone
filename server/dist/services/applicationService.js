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
exports._getAllApplicationsForRecruiter = exports._getAllApplicationsForCandidate = exports._getMyApplication = exports._getOneApplication = exports._updateApplication = exports._getAllApplications = exports._deleteApplication = exports._createApplication = void 0;
const models_1 = require("../models");
const _getAllApplications = (job_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Application.find({ job: job_id }).populate(["job", "candidate"]);
});
exports._getAllApplications = _getAllApplications;
const _getAllApplicationsForCandidate = (candidate_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Application.find({ candidate: candidate_id }).populate("job");
});
exports._getAllApplicationsForCandidate = _getAllApplicationsForCandidate;
const _getAllApplicationsForRecruiter = (recruiter_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Application.find().populate({
        path: "job",
        match: {
            recruiter: recruiter_id
        }
    }).populate("candidate");
});
exports._getAllApplicationsForRecruiter = _getAllApplicationsForRecruiter;
const _getOneApplication = (application_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Application.findById(application_id);
});
exports._getOneApplication = _getOneApplication;
const _getMyApplication = (job_id, candidate_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Application.findOne({
        candidate: candidate_id,
        job: job_id
    });
});
exports._getMyApplication = _getMyApplication;
const _createApplication = (applicationData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Application.create(applicationData);
});
exports._createApplication = _createApplication;
const _updateApplication = (applicationData, application_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Application.updateOne({ _id: application_id }, applicationData);
});
exports._updateApplication = _updateApplication;
const _deleteApplication = (application_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Application.deleteOne({ _id: application_id });
});
exports._deleteApplication = _deleteApplication;
