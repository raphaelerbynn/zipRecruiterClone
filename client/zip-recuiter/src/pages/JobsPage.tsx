
import JobPost from "../components/JobPost";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import { useAppSelector } from "../redux/store";


const JobsPage = () => {
    const jobs = useAppSelector((state) => state.jobs);

    

    return (
        <div style={{ minHeight: "100vh" }}>
            <NavBar />
            
            <div className=" pt-20">
                <div className=" w-full flex justify-center">
                    <SearchBar />
                </div>
            
            {
                jobs.filteredData?.map((job) => (
                        <JobPost key={job._id} _id={job._id} title={job.title} description={job.description} location={job.location} experience={job.experience} type={job.type} company={job.company} min={job.min} max={job.max} frequency={job.frequency} currency={job.currency} recruiter="" />
                ))
            }
            </div>
        </div>
    )
}

export default JobsPage;