import { useContext } from "react";
import AppLogo from "./AppLogo";
import { AuthContext } from "../utils/AuthProvider";
import RecruiterOptions from "./navOptions/RecruiterOptions";
import CandidateOptions from "./navOptions/candidateOptions";
import GuestOptions from "./navOptions/GuestOptions";


const NavBar = () => {
    const context: any = useContext(AuthContext);

    return (
        <div className=" py-4 px-8 shadow-md w-full flex justify-between top-0 sticky bg-slate-50">
            <div>
                <AppLogo />
            </div>
            <div className="flex space-x-6">
                {context.role !== "" && context.role === "recruiter" ? (
                        <RecruiterOptions />
                    ) : context.role !== "" && context.role === "candidate" ? (
                        <CandidateOptions />
                    ) : (
                        <GuestOptions />
                )}
                
            
            </div>
        </div>
    )
}


export default NavBar;