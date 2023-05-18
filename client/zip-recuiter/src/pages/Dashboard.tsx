import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";


const Dashboard = () => {
    return (
        <div className="flex flex-col h-screen overflow-y-hidden">
            <div className=" ">
                <NavBar />
            </div>
            <div className=" flex-1 flex h-full pt-10">
                <SideBar />
                <Outlet />
            </div>
        </div>
    )
}


export default Dashboard;