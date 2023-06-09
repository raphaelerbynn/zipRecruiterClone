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
    filteredData: (JobInterface&SalaryInterface)[],
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
    recruiter: string;
}

export interface SearchQueryInterface{
    title: string;
    location: string;
    experience: number | string;
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

export const JobSearchSchema = yup.object().shape({
    title: yup.string().notRequired(),
    location: yup.string().notRequired(),
    experience: yup.number().notRequired()
})


const getExtension = (filename: string) => {
    return filename.slice(filename.lastIndexOf('.'));
}
export const validationSchema = yup.object().shape({
    resume: yup.mixed()
    .test("fileSize", "File size is too large", (file: any) => {
        const maxSize = 3 * 1024 * 1024;
        return file.size <= maxSize;
    })
    .test("fileType", "Invalid file type", (file: any) => {
        const extentions = ['.pdf', '.doc', '.docx', ".txt"];
        return extentions.includes(getExtension(file.name).toLowerCase());
    })
    .required("Resume file is required"),
    
    coverLetter: yup.mixed()
        .test("fileSize", "File size is too large", (file: any) => {
            const maxSize = 3 * 1024 * 1024;
            return file.size <= maxSize;
        })
        .test("fileType", "Invalid file type", (file: any) => {
            const extentions = ['.pdf', '.doc', '.docx', ".txt"];
            return extentions.includes(getExtension(file.name).toLowerCase());
        })
        .required("Cover letter file is required"),
  });