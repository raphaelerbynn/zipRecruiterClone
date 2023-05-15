import { useNavigate } from "react-router-dom"


const SideBar = () => {
    const navigate = useNavigate();


    const handleToJobs = () => {
        navigate("my-jobs")
    }

    return (
        <div className=" px-3 pt-20 bg-slate-200 flex flex-col space-y-2 font-semibold">
            <button onClick={handleToJobs} className=" px-3 py-1 rounded-md w-full text-left hover:bg-emerald-200">Jobs</button>
            <button className=" px-3 py-1 rounded-md w-full text-left hover:bg-emerald-200">Candidates</button>
            <button className=" px-3 py-1 rounded-md w-full text-left hover:bg-emerald-200">Application Database</button>
        </div>
    )
}


export default SideBar;