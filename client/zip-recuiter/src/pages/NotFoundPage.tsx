import AppLogo from "../components/AppLogo"


const NotFoundPage = () => {
    return (
        <div className=" w-screen h-screen bg-slate-100 flex flex-col justify-center items-center space-y-3">
            <div className=" animate-bounce underline">
                <AppLogo />
            </div>
            <div>
                <h1 className=" text-xl">404 - Page not found</h1>
                <h3 className=" text-sm">This route is abandoned</h3>
            </div>
        </div>
    )
}

export default NotFoundPage;