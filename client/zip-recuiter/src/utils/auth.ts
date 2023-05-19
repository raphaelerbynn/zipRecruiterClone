import { api } from "./api";
import { LoginInterface, SignUpInterface } from "./schema";


const login = async (data: LoginInterface) => {
    try{
        const response = await api.post("/auth/login", data)
        const { token } = response.data;
        
        if(token){
            localStorage.setItem("token", token);
        }
        return response;
    }catch(error){
        console.log(error);
        return error;
    }
}

const signup = async (data: SignUpInterface) => {
    try{
        const response = await api.post("/auth/register", data);
        return response;
    }catch(error: any){
        return error;
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