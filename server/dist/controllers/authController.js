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
const services_1 = require("../services");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwt_secret_key = process.env.JWT_SECRET_KEY || "";
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    try {
        const user = yield (0, services_1._findUserByEmail)(userData.email, userData.role);
        console.log(user);
        if (user) {
            res.status(409);
            throw Error("User already exists");
        }
        const hashPassword = yield bcrypt_1.default.hash(userData.password, 10);
        yield (0, services_1._createUser)(Object.assign(Object.assign({}, userData), { password: hashPassword }));
        res.status(201).send("User registered");
    }
    catch (err) {
        next(err);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    try {
        // console.log(userData)
        const user = yield (0, services_1._findUserByEmail)(userData.email, userData.role);
        if (!user) {
            res.status(404);
            throw Error("Unknown user");
        }
        if (!user.password) {
            res.status(400);
            throw Error("no password");
        }
        const matchUser = yield bcrypt_1.default.compare(userData.password, user.password);
        if (!matchUser) {
            res.status(403);
            throw Error("Invalid username or password");
        }
        ;
        const payload = {
            _id: user._id,
            role: user.role
        };
        const token = yield jsonwebtoken_1.default.sign(payload, jwt_secret_key);
        res.status(200).send({
            token: token
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    register,
    login
};
//     const userDetails = req.body;
//     try{
// const registerUser = async (req: Request, res: Response, next: NextFunction) => {
//     const userDetails = req.body;
//     try{
//         const user = await findUserBy(userDetails.email);
//         if(user){
//             res.status(409);
//             throw Error("Username already exist");
//         }
//         //hash password
//         const hashPwd = await bcrpyt.hash(userDetails.password, 10);
//         await User.create({
//             ...userDetails,
//             password: hashPwd
//         });
//         res.status(201).send("User created successfully");
//     }catch(err){
//         next(err);
//     }
// };
// const loginUser = async (req: RequestCustom, res: Response, next: NextFunction) => {
//     const userDetails = req.body;
//     try{
//         const user = await findUserByEmail(userDetails.email);
//         if (!user){
//             res.status(403);
//             throw Error("Unknown user");
//         };
//         const matchUser = await bcrpyt.compare(userDetails.password, user.password);
//         if(!matchUser){
//             res.status(403);
//             throw Error("Invalid username or password");
//         };
//         const token = await jwt.sign(userDetails, process.env.JWT_SECRET_KEY);
//         res.json({
//             token: token
//         })
//     }catch(err){
//         next(err);
//     }
// };
// export default {
//     registerUser,
//     loginUser
// }
