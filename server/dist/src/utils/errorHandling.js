"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const errMsg = {
        error: {
            message: err.message
        }
    };
    const code = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(err);
    res.status(code).json(errMsg);
};
exports.errorHandler = errorHandler;
