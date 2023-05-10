import { Router } from "express";
import { applicationController } from "../controllers";
import { authenticateUser, validateApplicationData } from "../utils";

const router = Router({ mergeParams: true });

router.get("/", authenticateUser, applicationController.getApplications);

router.get("/:apply_id", authenticateUser, applicationController.getOneApplication)

router.post("/", authenticateUser, validateApplicationData, applicationController.apply);

router.put("/:apply_id", authenticateUser, applicationController.updateApplication);
router.delete("/:apply_id", authenticateUser, applicationController.deleteApplication);


export default router;