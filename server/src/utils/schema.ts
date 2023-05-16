import express, { Request } from "express";
import * as yup from "yup";

interface AuthRequest extends Request{
    user: {
        email: string;
        password: string;
        role: string;
    };
}

const jobSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    location: yup.string().required(),
    experience: yup.number().notRequired(),
    type: yup.string().required("Job type required"),
    company: yup.string().required(),

    min: yup.number().min(1).notRequired(),
    max: yup.number().notRequired(),
    currency: yup.string().notRequired(),
    frequency: yup.string().notRequired()
    
});

const applicationSchema = yup.object().shape({
    coverLetter: yup.mixed().required(),
    resume: yup.mixed().required(),
    status: yup.string().notRequired()
});

const userRegisterSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    role: yup.string().required()
});

const userLoginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    role: yup.string().required()
});

const salarySchema = yup.object().shape({
    min: yup.number().min(1).notRequired(),
    max: yup.number().notRequired(),
    currency: yup.string().notRequired(),
    frequency: yup.string().notRequired()
});


export {
    jobSchema,
    applicationSchema,
    userRegisterSchema,
    userLoginSchema,
    salarySchema,
    AuthRequest
}
