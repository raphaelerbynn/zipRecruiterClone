import avatar from "../assets/imgs/avatar.jpg"
import AppLogo from "./AppLogo";


interface Prop{
    question: string
}

const SignUpQuestion = ({question}: Prop) => {
    
    return (
        <div className="flex-1 flex items-center h-full p-10">
            <div>
                <div className=" absolute top-4 w-10 animate-pulse">
                    <span>
                        <AppLogo />
                    </span>
                </div>
                <div className=" flex items-center space-x-5">
                    <div className=" w-16 rounded-full overflow-hidden border-2 animate-bounce">
                        <img src={avatar} alt="avatar" />
                    </div>
                    <h1 className=" font-bold text-emerald-600 text-3xl text-left">{question}</h1>
                </div>
           </div>
        </div>
    )
}


export default SignUpQuestion;