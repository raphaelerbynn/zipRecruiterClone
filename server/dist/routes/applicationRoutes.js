"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const utils_1 = require("../utils");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)({ mergeParams: true });
router.get("/", utils_1.authenticateUser, controllers_1.applicationController.getApplications);
router.get("/:apply_id", utils_1.authenticateUser, controllers_1.applicationController.getOneApplication);
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post("/", utils_1.authenticateUser, upload.fields([{ name: "resume" }, { name: "coverLetter" }]), utils_1.validateApplicationData, controllers_1.applicationController.apply);
router.put("/:apply_id", utils_1.authenticateUser, controllers_1.applicationController.updateApplication);
router.get('/download/:filename', controllers_1.applicationController.downloadFile);
exports.default = router;
