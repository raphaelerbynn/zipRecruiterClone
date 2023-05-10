import { NextFunction, Request, Response } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const errMsg = {
        error: {
            message: err.message
        }
    };
    const code = res.statusCode === 200 ? 500 : res.statusCode;

    console.error(err);
    res.status(code).json(errMsg);
}


export {
    errorHandler
};