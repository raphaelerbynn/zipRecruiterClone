import { api } from "./api";
import { LoginInterface, SignUpInterface } from "./schema";


const login = async (data: LoginInterface) => {
    try{
        const response = await api.post("/auth/login", data)
        const { token } = response.data;
        console.log(token);
        if(token){
            localStorage.setItem("token", token);
        }
    }catch(error){
        console.log(error);
    }
}

const signup = async (data: SignUpInterface) => {
    try{
        const response = await api.post("/auth/signup", data);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

const logout = () => {
    localStorage.removeItem("token");
}


export {
    login,
    signup,
    logout
}