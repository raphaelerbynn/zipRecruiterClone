import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import homeBg from "../assets/imgs/homeBg.jpg";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";


const HomePage = () => {
    const context = useContext(AuthContext)
    console.log(context)
    return (
        <div className="  h-screen flex flex-col">
            <NavBar />
            <div style={{backgroundImage: `linear-gradient(rgba(248, 250, 252, 1), rgba(248, 250, 252, 0.95)), url(${homeBg})`}} className="flex-1 flex flex-col justify-center items-center bg-center bg-cover">
                <SearchBar />
            </div>
        </div>
    )
}

export default HomePage;