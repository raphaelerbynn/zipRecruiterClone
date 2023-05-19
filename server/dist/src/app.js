"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const middlewares_1 = require("./utils/middlewares");
const utils_1 = require("./utils");
require("./config/database");
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/api/auth", routes_1.authRoute);
app.use("/api/jobs", routes_1.jobRoute);
app.get("/test", (req, res) => {
    res.send("true test");
});
app.use(middlewares_1.undefinedEndpoint);
app.use(utils_1.errorHandler);
config_1.dbConnect.then(() => {
    console.log("Database connected");
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    });
}).catch((err) => {
    console.error(`Database not connected: ${err}`);
});
exports.default = app;
