import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchJobs } from "../redux/actions/jobAction";
import JobPost from "../components/JobPost";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";


const JobsPage = () => {
    const jobs = useAppSelector((state) => state.jobs);
    // const dispatch = useAppDispatch();
    // console.log(jobs)
    // useEffect(() => {
    //     return () => dispatch(fetchJobs());
    // }, [dispatch])

    

    return (
        <div>
            <NavBar />
            
            <div className=" pt-20">
                <div className=" w-full flex justify-center">
                    <SearchBar />
                </div>
            
            {
                jobs.filteredData?.map((job) => (
                    <div key={job._id}>
                        <JobPost _id={job._id} title={job.title} description={job.description} location={job.location} experience={job.experience} type={job.type} company={job.company} min={job.min} max={job.max} frequency={job.frequency} currency={job.currency} recruiter="" />
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default JobsPage;