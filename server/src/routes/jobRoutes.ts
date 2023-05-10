import {Router} from "express";
import { jobController } from "../controllers";
import { authenticateUser, validateJobData, validateSalaryData } from "../utils";
import applyRouter from "./applicationRoutes";

const router = Router();

router.use("/:job_id/apply", applyRouter);

router.get("/search", jobController.searchJob);

router.get("/", jobController.getAllJobs);
router.get("/:job_id", jobController.getOneJob);

// router.post("/", validateJobData, jobController.createJob);
router.post("/", authenticateUser, validateJobData, jobController.createJob);


router.put("/:job_id", authenticateUser, jobController.updateJob);
router.delete("/:job_id", authenticateUser, jobController.deleteJob);

export default router;