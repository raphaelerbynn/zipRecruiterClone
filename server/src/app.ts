import express, { Request, Response } from "express";
import { authRoute, jobRoute } from "./routes";
import { undefinedEndpoint } from "./utils/middlewares";
import { errorHandler } from "./utils";
import "./config/database"
import { dbConnect } from "./config";
import cors from "cors";


const app = express();
const port = 5000;

app.use(cors());
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

