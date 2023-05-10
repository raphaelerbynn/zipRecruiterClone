import * as yup from "yup"


export interface PostInterface{
    title: string;
    description: string | null;
    location: string;
    experience: number | null;
    type: string;
    company: string | null;
    salary: SalaryInterface
}

interface SalaryInterface{
    min: number;
    max: number | null;
    currency: string | null;
    frequency: string;
}

export interface LoginInterface{
    email: string;
    password: string;
    role: string
}

export interface SignUpInterface{
    name: string
    email: string;
    password: string;
    role: string
}

export interface ContextInterface{
    user: string;
    role: string;
    isAuthenticated: boolean | null;
}


//--------------yup--------------
export const LoginSchema = yup.object().shape({
    email: yup.string().email().required("Email required"),
    password: yup.string().min(5).required("Password required")
});