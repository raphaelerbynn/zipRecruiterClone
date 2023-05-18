
import MyApplicationList from "../components/MyApplicationList";
import NavBar from "../components/NavBar";


const MyApplicationsPage = () => {
    return (
        <div style={{ minHeight: "100vh" }}>
            <NavBar />
            
            <div className=" pt-20">
                <MyApplicationList />
            </div>
        </div>
    )
}

export default MyApplicationsPage;