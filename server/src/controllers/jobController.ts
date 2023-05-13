import { NextFunction, Request, RequestHandler, Response } from "express"
import { _createJob, _deleteJob, _getAllJobs, _updateJob, _getOneJob, _getJobBySearch } from "../services";


const getAllJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobs = await _getAllJobs();
        res.json(jobs);
    } catch (err) {
        next(err);
    }
}

const getOneJob = async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.job_id;
    try {
        const job = await _getOneJob(jobId);
        if(!job){
            res.status(404);
            throw Error("Job not found");
        }
        res.json(job);
    } catch (err) {
        next(err);
    }
}

const createJob = async (req: Request, res: Response, next: NextFunction) => {
    const jobData = req.body;
    const user: any = req.params.user;

    const job = {
        ...jobData,
        recruiter: user._id
    }

    try {
        console.log(job);
        await _createJob(job);

        if (user.role !== "recruiter"){
            res.status(403);
            throw Error("User not authorized");
        }

        res.status(201).json(job);
    } catch (err) {
        next(err);
    }
}

const updateJob = async (req: Request, res: Response, next: NextFunction) => {
    const jobData = req.body;
    const jobId = req.params.job_id;
    const user: any = req.params.user;
    try {
        const job = await _getOneJob(jobId);
        if(!job){
            res.status(404);
            throw Error("Job not found");
        }

        if (user.role !== "recruiter"){
            res.status(403);
            throw Error("User not authorized");
        }
        //console.log(typeof recruiter._id + "====" + typeof job.recruiter);
        if(String(user._id) !== String(job.recruiter)){
            res.status(409);
                throw Error("Unauthorized");
        }

        await _updateJob(jobData, jobId);
        res.status(200).send("Job updated successfully");
    } catch (err) {
        next(err);
    }
}

// search by title, experience and location
const searchJob = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    try{
        
        console.log(">>>>>>>>>"+query)
        if (!query){
            throw Error("Nothing to search");
        }

        const jobs = await _getJobBySearch(query);
        res.json(jobs);
    }catch(err){
        next(err);
    }
};

const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.job_id;
    const user: any = req.params.user;
    try {
        const job = await _getOneJob(jobId);
        if(!job){
            res.status(404);
            throw Error("Job not found");
        }

        if (user.role !== "recruiter"){
            res.status(403);
            throw Error("User not authorized");
        }

        if(String(user._id) !== String(job.recruiter)){
            res.status(409);
                throw Error("Unauthorized");
        }
        
        await _deleteJob(jobId);
        res.status(200).send("Job deleted");
    } catch (err) {
        next(err);
    }
}

export default {
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
    getOneJob,
    searchJob
}