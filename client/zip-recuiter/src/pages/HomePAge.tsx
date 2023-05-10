import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import homeBg from "../assets/imgs/homeBg.jpg";


const HomePage = () => {
    return (
        <div style={{backgroundImage: `linear-gradient(rgba(248, 250, 252, 1), rgba(248, 250, 252, 0.95)), url(${homeBg})`}} className=" h-screen flex flex-col justify-center items-center bg-center bg-cover">
            <NavBar />
            <SearchBar />
        </div>
    )
}

export default HomePage;