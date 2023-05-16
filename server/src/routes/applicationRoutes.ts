import { Router } from "express";
import { applicationController } from "../controllers";
import { authenticateUser, validateApplicationData } from "../utils";
import multer from "multer";

const router = Router({ mergeParams: true });

router.get("/", authenticateUser, applicationController.getApplications);

router.get("/:apply_id", authenticateUser, applicationController.getOneApplication)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({storage: storage});
router.post("/", authenticateUser, upload.fields([{ name: "resume" }, { name: "coverLetter"}]), validateApplicationData, applicationController.apply);

router.put("/:apply_id", authenticateUser, applicationController.updateApplication);
router.delete("/:apply_id", authenticateUser, applicationController.deleteApplication);


export default router;