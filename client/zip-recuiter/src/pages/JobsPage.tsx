import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchJobs } from "../redux/actions/jobAction";
import JobPost from "../components/JobPost";
import NavBar from "../components/NavBar";


const JobsPage = () => {
    const jobs = useAppSelector((state) => state.jobs);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => dispatch(fetchJobs());
    }, [dispatch])

    return (
        <div>
            <NavBar />
            {
                jobs.data?.map((job) => (
                    <div key={job._id}>
                        <JobPost _id={job._id} title={job.title} description={job.description} location={job.location} experience={job.experience} type={job.type} company={job.company} min={job.min} max={job.max} frequency={job.frequency} currency={job.currency} recruiter="" onClickUpdate={() => {}}/>
                    </div>
                ))
            }
        </div>
    )
}

export default JobsPage;