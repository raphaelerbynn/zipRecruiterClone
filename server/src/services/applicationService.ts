import { Application } from "../models";


const _getAllApplications = async (job_id: string) => {
    return await Application.find({ job: job_id }).populate(
        ["job", "candidate"]
    )
};

const _getAllApplicationsForCandidate = async (candidate_id: string) => {
    return await Application.find({ candidate: candidate_id }).populate(
        "job"
    )
};

const _getAllApplicationsForRecruiter = async (recruiter_id: string) => {
    return await Application.find().populate({
        path: "job",
        match: {
            recruiter: recruiter_id
        }   
    }).populate("candidate")
};

const _getOneApplication = async (application_id: string) => {
    return await Application.findById(application_id);
};

const _getMyApplication = async (job_id: string, candidate_id: string) => {
    return await Application.findOne({
        candidate: candidate_id,
        job: job_id
    });
};

const _createApplication = async (applicationData: {}) => {
    return await Application.create(applicationData);
};

const _updateApplication = async (applicationData: {}, application_id: string) => {
    return await Application.updateOne({_id: application_id}, applicationData);
};

const _deleteApplication = async (application_id: string) => {
    return await Application.deleteOne({_id: application_id});
};

export {
    _createApplication,
    _deleteApplication,
    _getAllApplications,
    _updateApplication,
    _getOneApplication,
    _getMyApplication,
    _getAllApplicationsForCandidate,
    _getAllApplicationsForRecruiter
}