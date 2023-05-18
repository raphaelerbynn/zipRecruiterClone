import express, { Request, Response } from "express";
import { authRoute, jobRoute } from "./routes";
import { undefinedEndpoint } from "./utils/middlewares";
import { errorHandler } from "./utils";
import "./config/database"
import { dbConnect } from "./config";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config()

const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);

app.get("/test", (req: Request, res: Response) => {
    res.send("true test");
});

app.use(undefinedEndpoint);
app.use(errorHandler);

dbConnect.then(() => {
    console.log("Database connected");
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    });

}).catch((err: Error) => {
    console.error(`Database not connected: ${err}`)
});

