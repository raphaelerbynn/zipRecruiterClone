"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRoute = exports.authRoute = void 0;
const authRoutes_1 = __importDefault(require("./authRoutes"));
exports.authRoute = authRoutes_1.default;
const jobRoutes_1 = __importDefault(require("./jobRoutes"));
exports.jobRoute = jobRoutes_1.default;
