import { NextFunction, Request, Response } from "express";
import { _createUser, _findUserByEmail } from "../services";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    try {
        const user = await _findUserByEmail(userData.email, userData.role);
        if(user){
            res.status(409);
            throw Error("User already exists");
        }

        const hashPassword = await bcrypt.hash(userData.password, 10);
        await _createUser({
            ...userData,
            password: hashPassword
        });

        res.status(201).send("User registered");
    } catch (err) {
        next(err)
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    
    try {
        
        const user: any = await _findUserByEmail(userData.email, userData.role);
        if(!user){
            res.status(404);
            throw Error("Unknown user");
        }
      
        if(!user.password){
            res.status(400);
            throw Error("no password");
        }

        const matchUser = await bcrypt.compare(userData.password, user.password);
        if(!matchUser){
            res.status(403);
            throw Error("Invalid username or password");
        };

        const payload = {
            _id: user._id,
            role: user.role
        }
        const token = await jwt.sign(payload, "my-secret-key");
        res.status(200).send({
            token: token
        });
    } catch (err) {
        next(err);
    }
};

export default {
    register,
    login
}























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