import { applicationSchema, jobSchema, salarySchema, userRegisterSchema, userLoginSchema, AuthRequest } from "./schema";
import { errorHandler } from "./errorHandling";
import {  authenticateUser, validateUserLoginData, validateJobData, validateApplicationData, validateSalaryData, validateUserRegisterData } from "./middlewares";


export {
    jobSchema,
    applicationSchema,
    userRegisterSchema,
    userLoginSchema,
    salarySchema,
    errorHandler,
    validateUserLoginData,
    // authenticateCandidate,
    authenticateUser,
    AuthRequest,
    validateApplicationData,
    validateJobData,
    validateSalaryData,
    validateUserRegisterData,
}