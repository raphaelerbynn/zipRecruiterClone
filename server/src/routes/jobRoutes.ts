import {Router} from "express";
import { applicationController, jobController } from "../controllers";
import { authenticateUser, validateJobData } from "../utils";
import applyRouter from "./applicationRoutes";

const router = Router();

router.use("/:job_id/apply", applyRouter);
router.get("/applications", authenticateUser, applicationController.getAllApplicationsForCandidate);
router.get("/applicants", authenticateUser, applicationController.getAllApplicationsForRecruiter);
router.delete("/applications/:apply_id", authenticateUser, applicationController.deleteApplication);

router.get("/search", jobController.searchJob);

router.get("/", jobController.getAllJobs);
router.get("/:job_id", jobController.getOneJob);

// router.post("/", validateJobData, jobController.createJob);
router.post("/", authenticateUser, validateJobData, jobController.createJob);


router.put("/:job_id", authenticateUser, jobController.updateJob);
router.delete("/:job_id", authenticateUser, jobController.deleteJob);

export default router;