import { useNavigate } from "react-router-dom"


const GuestOptions = () => {
    const navigate = useNavigate();

    const handleSubmit = async () => {
        navigate("/login");
    }

    const handleToPost = () => {
        navigate("/post");
    }


    return (
        <>
            <button onClick={handleToPost} className=" outline outline-1 outline-gray-300 px-4 py-1 rounded-full hover:bg-gray-100 text-emerald-700 font-medium">Post a Job</button>
            <button className=" hover:underline" onClick={handleSubmit}>Sign In</button>
        </>
    )
}

export default GuestOptions;