import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchJobs } from "../redux/actions/jobAction";
import { AuthContext } from "../utils/AuthProvider";
import JobPost from "./JobPost";
import { useNavigate } from "react-router-dom";
import { JobInterface, SalaryInterface } from "../utils/schema";

export let jobClicked: JobInterface & SalaryInterface;

const RecruiterJobs = () => {
    const allJobs = useAppSelector(state => state.jobs.data);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const context: any = useContext(AuthContext);
    const jobs = allJobs.filter(job => context.user === job.recruiter)

    console.log(allJobs);

    
    useEffect(() => {
        return () => dispatch(fetchJobs());
    }, []);

    const onClickUpdate = (job: JobInterface&SalaryInterface) => {
        jobClicked = job;
        navigate("/update-job");
    }


    return (
        <div className=" w-full p-10 overflow-y-scroll ">
            {
                jobs.length > 0 ? (
                
                        jobs?.map((job) => (
                            <div key={job._id}>
                                <JobPost _id={job._id} title={job.title} description={job.description} location={job.location} experience={job.experience} type={job.type} company={job.company} min={job.min} max={job.max} frequency={job.frequency} currency={job.currency} recruiter={job.recruiter} onClickUpdate={() => onClickUpdate(job)} />
                            </div>
                        ))
                    
                ) : (
                    <div>
                        No jobs
                    </div>
                )
            }
        </div>
    )
}

export default RecruiterJobs;