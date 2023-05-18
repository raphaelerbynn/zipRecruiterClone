import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";


const CandidateOptions = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout();
        navigate("/login");
        window.location.reload();
    }

    const handleToApplications = () => {
        navigate("/my-applications");
    }

    return (
        <>
            <button onClick={handleToApplications} className=" outline outline-1 outline-gray-300 px-4 py-1 rounded-full hover:bg-gray-100 text-emerald-700 font-medium">My Applications</button>
            <button className=" hover:underline" onClick={handleLogout}>Logout</button>
        </>
    )
}

export default CandidateOptions;