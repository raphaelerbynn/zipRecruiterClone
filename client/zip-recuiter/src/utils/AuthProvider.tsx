import { createContext, useEffect, useState } from "react"
import { ContextInterface } from "./schema";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }: any) => {

    const [context, setContext] = useState<ContextInterface>({
        user: "",
        role: "",
        isAuthenticated: null,
    });

    useEffect(() => {
        return () => {
            const token = localStorage.getItem("token");
            if(token){
                const {_id, role }: any = jwtDecode(token);
                setContext({
                    user: _id,
                    role: role,
                    isAuthenticated: token ? true : false
                });

            }else{
                setContext({
                    user: "",
                    role: "",
                    isAuthenticated: token ? true : false,
                });
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider, 
    AuthContext
}