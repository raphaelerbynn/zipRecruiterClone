import { NextFunction, Request, Response } from "express";
import { _createApplication, _deleteApplication, _getAllApplications, _getMyApplication, _getOneApplication, _getOneJob, _updateApplication } from "../services";
import multer from "multer";

const getApplications = async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.job_id;
    const user: any = req.params.user;
    try {
        const job = await _getOneJob(jobId);
        if(!job){
            res.status(404);
            throw Error("Job not found");
        }
        let applications;
        if (user.role === "candidate"){
            applications = await _getMyApplication(jobId, user._id);
            res.json(applications);
        }
        else{
            if(String(user._id) !== String(job.recruiter)){
                res.status(409);
                    throw Error("Unauthorized");
            }
            applications = await _getAllApplications(jobId);
            res.json(applications);
        }
        

    } catch (err) {
        next(err);
    }
}

const getOneApplication = async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.job_id;
    const applicationId = req.params.apply_id;
    const user: any = req.params.user;
    try {
        const job = await _getOneJob(jobId);
        if(!job){
            res.status(404);
            throw Error("Job not found");
        }
        let application;
        if (user.role === "candidate"){
            application = await _getMyApplication(jobId, user._id);
            res.json(application);
        }
        else{
            if(String(user._id) !== String(job.recruiter)){
                res.status(409);
                    throw Error("Unauthorized");
            }
            application = await _getOneApplication(applicationId);
            res.json(application);
        }
    } catch (err) {
        next(err);
    }
}


const apply = async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.job_id;
    const user: any = req.params.user;
    const {resume, coverLetter}: any = req.files;
    const applicationData = {
        resume: resume[0].filename,
        coverLetter: coverLetter[0].filename,
        job: jobId,
        candidate: user._id
    }

    try {
        const job = await _getOneJob(jobId);
        if(!job){
            res.status(404);
            throw Error("Job not found");
        }

        if (user.role !== "candidate"){
            res.status(403);
            throw Error("User not authorized");
        }

        const application = await _getMyApplication(jobId, user._id);
        console.log(application)
        if (application){
            res.status(409);
            throw Error("Already applied");
        }

        await _createApplication(applicationData);

        res.status(201).send("Job applied successfully");
    } catch (err) {
        next(err);
    }
}

const updateApplication = async (req: Request, res: Response, next: NextFunction) => {
    const applicationId = req.params.apply_id;
    const jobId = req.params.job_id;
    const user: any = req.params.user;

    try {
        const job = await _getOneJob(jobId);
        if(!job){
            res.status(404);
            throw Error("Job not found");
        }

        const application = await _getOneApplication(applicationId);
        if(!application){
            res.status(404);
            throw Error("Application not found");
        }

        if (user.role === "recruiter"){
            if (user._id !== String(job.recruiter)){
                res.status(403);
                throw Error("User not authorized");
            }

            const updatedApplication = {
                status: req.body.status
            };
            
            await _updateApplication(updatedApplication, applicationId);
            res.send("application status updated");
        }else{
            const updatedApplication = {
                ...req.body,
                status: application.status
            }
            await _updateApplication(updatedApplication, applicationId);
            res.status(200).send("Application updated");
        }

    } catch (err) {
        next(err);
    }
}

const deleteApplication = async (req: Request, res: Response, next: NextFunction) => {
    const applicationId = req.params.apply_id;
    const jobId = req.params.job_id;
    const user: any = req.params.user;

    try {
        const job = await _getOneJob(jobId);
        if(!job){
            res.status(404);
            throw Error("Job not found");
        }

        const application = await _getOneApplication(applicationId);
        if(!application){
            res.status(404);
            throw Error("Application not found");
        }

        console.log(typeof user._id)
        if (user.role !== "candidate" && user._id !== String(application.candidate)){
            res.status(403);
            throw Error("User not authorized");
        }

        await _deleteApplication(applicationId);
        res.status(200).send("Application deleted");
    } catch (err) {
        next(err);
    }
}

export default {
    getApplications,
    apply,
    updateApplication,
    deleteApplication,
    getOneApplication
}