import { NextFunction, Request, RequestHandler, Response, request } from "express";
import { AuthRequest, applicationSchema, jobSchema, salarySchema, userLoginSchema, userRegisterSchema } from "./schema";
import jwt from "jsonwebtoken";
import multer from "multer";

const jwt_secret_key: string = process.env.JWT_SECRET_KEY || "";
const validateUserLoginData = async (req: Request, res: Response, next: NextFunction ) => {
    try{
        await userLoginSchema.validate(req.body);
        next();
    }catch(err){
        next(err);
    }
};

const validateUserRegisterData = async (req: Request, res: Response, next: NextFunction ) => {
    try{
        await userRegisterSchema.validate(req.body);
        next();
    }catch(err){
        next(err);
    }
};

const validateApplicationData = async (req: Request, res: Response, next: NextFunction ) => {
    try{
        await applicationSchema.validate(req.files);
        next();
    }catch(err){
        next(err);
    }
};

const validateJobData = async (req: Request, res: Response, next: NextFunction ) => {
    try{
        await jobSchema.validate(req.body);
        next();
    }catch(err){
        next(err);
    }
};

const validateSalaryData = async (req: Request, res: Response, next: NextFunction ) => {
    try{
        await salarySchema.validate(req.body);
        next();
    }catch(err){
        next(err);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({storage: storage});
// const uploadFiles = (req: Request, res: Response, next: NextFunction ) => {
//         upload.fields([{ name: 'resume' }, { name: 'coverLetter' }]);
//         next();
// }

// const authenticateCandidate = async (req: Request, res: Response, next: NextFunction ) => {
    
//     try{
//         const authHeader = req.headers.authorization;
//         if (!authHeader){
//             res.status(403);
//             throw Error("No authorization header");
//         }

//         const token = authHeader.split(" ")[1];
//         if (!token){
//             res.status(403);
//             throw Error("User not authorized");
//         }

//         const user: any = jwt.verify(token, "my-secret-key");
//         if (user.role !== "candidate"){
//             res.status(403);
//             throw Error("User not authorized");
//         }
        
//         // req.user = user;
//         next();
//     }catch(err){
//         next(err);
//     }
// };

const authenticateUser = async (req: Request, res: Response, next: NextFunction ) => {
    
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader){
            res.status(403);
            throw Error("No authorization header");
        }

        const token = authHeader.split(" ")[1];
        if (!token){
            res.status(403);
            throw Error("User not authorized");
        }

        const user: any = jwt.verify(token, jwt_secret_key);
        req.params.user = user;
        next();
    }catch(err){
        next(err);
    }
};


const undefinedEndpoint = (req: Request, res: Response, next: NextFunction) => {
    const err = new Error("Page requesting not found");
    res.status(404);
    next(err)
}


export {
    validateUserLoginData,
    validateUserRegisterData,
    validateApplicationData,
    validateJobData,
    validateSalaryData,
    undefinedEndpoint,
    // authenticateCandidate,
    authenticateUser,
    upload
}