import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import { useState } from "react";
import { Link } from "react-router-dom";


const RecruiterOptions = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);


    const handleLogout = async () => {
        logout();
        navigate("/login", { replace: true});
        window.location.reload();

    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleToPost = () => {
        navigate("/post");
    }



    return (
        <>
            <button onClick={handleToPost} className=" outline outline-1 outline-gray-300 px-4 py-1 rounded-full hover:bg-gray-100 text-emerald-700 font-medium">Post a Job</button>
            <div>
                <button onClick={toggleMenu} className=" hover:outline hover:outline-8 hover:outline-slate-200 w-7 h-7 rounded-full outline outline-1 outline-slate-300"> 
                    ---
                </button>
                { showMenu &&
                    <div className=" absolute right-0 top-14 p-4 text-left text-sm bg-slate-50 shadow-xl m-2">
                        <ul className=" space-y-2">
                            <li>
                                <Link to="/login" >
                                    Profile
                                </Link>
                            </li>
                            <li className="">
                                <Link to="/login" >
                                    Jobs Applied
                                </Link>
                            </li>
                            <li className=" bg-red-400 text-white rounded-full text-center hover:bg-red-500">
                                <Link to="/login" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </>
    )
}

export default RecruiterOptions;