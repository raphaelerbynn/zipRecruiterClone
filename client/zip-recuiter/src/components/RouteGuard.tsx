import { useContext } from "react"
import { AuthContext } from "../utils/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";


const Guard = () => {
    const context: any = useContext(AuthContext);

    return (
        <>
            { (context.isAuthenticated ? <Outlet /> : <Navigate to="/login" />)
            }
        </>
    )
}


export default Guard;