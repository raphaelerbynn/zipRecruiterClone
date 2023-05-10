import { Job } from "../models";


const _getAllJobs = async () => {
    return await Job.find();
}

const _getJobBySearch = async (query: any) => {
    const querySearch: any = {};

    if (query.title) {
      querySearch.title = { $regex: query.title as string, $options: "i" };
    }
    if (query.location) {
      querySearch.location = { $regex: query.location as string, $options: "i" };
    }
    if (query.experience) {
      querySearch.experience = query.experience;
    }


    return await Job.find({
        $and: [querySearch]
    }).populate("recruiter");

}

const _getOneJob = async (job_id: string) => {
    return await Job.findById(job_id);
}

const _createJob = async (jobData: {}) => {
    return await Job.create(jobData);
}
const _updateJob = async (jobData: {}, job_id: string) => {
    return await Job.updateOne({_id: job_id}, jobData);
}
const _deleteJob = async (job_id: string) => {
    return await Job.deleteOne({_id: job_id});
}

export {
    _createJob,
    _deleteJob,
    _getAllJobs,
    _updateJob,
    _getOneJob,
    _getJobBySearch
}