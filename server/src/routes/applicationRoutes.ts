import { Router } from "express";
import { applicationController } from "../controllers";
import { authenticateUser, validateApplicationData } from "../utils";
import multer from "multer";
import fs from "fs";

const router = Router({ mergeParams: true });

router.get("/", authenticateUser, applicationController.getApplications);

router.get("/:apply_id", authenticateUser, applicationController.getOneApplication)

const uploadFolder = 'uploads/';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
  fs.chmodSync(uploadFolder, '755');
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({storage: storage});
router.post("/", authenticateUser, upload.fields([{ name: "resume" }, { name: "coverLetter"}]), validateApplicationData, applicationController.apply);

router.put("/:apply_id", authenticateUser, applicationController.updateApplication);

router.get('/download/:filename', applicationController.downloadFile);


export default router;