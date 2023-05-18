import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"


const SideBar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    console.log(currentPath.includes("candidates"))
    const [activeBtn, setActiveBtn] = useState(
        currentPath.includes("jobs") ? 
        "jobs" : 
        currentPath.includes("candidates" ? 
        "candidates" :
        ""));
    const navigate = useNavigate();


    const handleToJobs = () => {
        navigate("my-jobs");
        setActiveBtn("jobs");
    }

    const handleToCandidates = () => {
        navigate("shortlisted-candidates")
        setActiveBtn("candidates");
    }

    return (
        <div className=" px-3 pt-20 bg-slate-200 flex flex-col space-y-2 font-semibold">
            <button onClick={handleToJobs} className={`${activeBtn === "jobs" ? "bg-emerald-600 text-slate-50 " : " hover:bg-emerald-300"} px-3 py-1 rounded-md w-full text-left  `}>Jobs</button>
            <button onClick={handleToCandidates} className={`${activeBtn === "candidates" ? "bg-emerald-600 text-slate-50 hover:bg-emerald-600 " : " hover:bg-emerald-300"} px-3 py-1 rounded-md w-full text-left `}>Shortlisted Candidates</button>
            
        </div>
    )
}


export default SideBar;