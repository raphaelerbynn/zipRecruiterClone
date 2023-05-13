import * as yup from "yup"


export interface PostInterface{
    title: string;
    description: string | null;
    location: string;
    experience: number | null;
    type: string;
    company: string | null;
}

export interface SalaryInterface{
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

export interface JobState{
    data: (JobInterface&SalaryInterface)[],
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null
}

export interface JobInterface{
    _id: string,
    title: string;
    description: string | null;
    location: string;
    experience: number | null;
    type: string;
    company: string | null;
}


//--------------yup--------------
export const LoginSchema = yup.object().shape({
    email: yup.string().email().required("Email required"),
    password: yup.string().min(5).required("Password required")
});

export const SignUpSchema = yup.object().shape({
    role: yup.string().required(),
    name: yup.string().required("Full name required"),
    email: yup.string().email().required("Email required"),
    password: yup.string().min(5).required("Password required")
});

export const PostJobSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    location: yup.string().required(),
    experience: yup.number().required(),
    type: yup.string().required(),
    company: yup.string().notRequired(),
    
    min: yup.number().min(1).required(),
    max: yup.number().notRequired(),
    currency: yup.string().notRequired(),
    frequency: yup.string().notRequired()
});