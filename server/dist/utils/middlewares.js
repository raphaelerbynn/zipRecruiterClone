"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.authenticateUser = exports.undefinedEndpoint = exports.validateSalaryData = exports.validateJobData = exports.validateApplicationData = exports.validateUserRegisterData = exports.validateUserLoginData = void 0;
const schema_1 = require("./schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const validateUserLoginData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema_1.userLoginSchema.validate(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.validateUserLoginData = validateUserLoginData;
const validateUserRegisterData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema_1.userRegisterSchema.validate(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.validateUserRegisterData = validateUserRegisterData;
const validateApplicationData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema_1.applicationSchema.validate(req.files);
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.validateApplicationData = validateApplicationData;
const validateJobData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema_1.jobSchema.validate(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.validateJobData = validateJobData;
const validateSalaryData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema_1.salarySchema.validate(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.validateSalaryData = validateSalaryData;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.upload = upload;
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
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(403);
            throw Error("No authorization header");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(403);
            throw Error("User not authorized");
        }
        const user = jsonwebtoken_1.default.verify(token, "my-secret-key");
        req.params.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.authenticateUser = authenticateUser;
const undefinedEndpoint = (req, res, next) => {
    const err = new Error("Page requesting not found");
    res.status(404);
    next(err);
};
exports.undefinedEndpoint = undefinedEndpoint;
