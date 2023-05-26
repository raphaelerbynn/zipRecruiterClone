import { createContext, useEffect, useState } from "react"
import { ContextInterface } from "./schema";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }: any) => {
    const token = localStorage.getItem("token");
    let user: any;
    if(token){
        user = jwtDecode(token);
    }
    const [context, setContext] = useState<ContextInterface>({
        user: user?._id || "",
        role: user?.role || "",
        isAuthenticated: token ? true : false,
    });

    useEffect(() => {
        return () => {
            
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
    }, [token]);

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