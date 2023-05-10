import { Router } from "express";
import { authController } from "../controllers";
import { validateUserLoginData, validateUserRegisterData } from "../utils/middlewares";

const router = Router();

router.post("/register", validateUserRegisterData, authController.register);
router.post("/login", validateUserLoginData, authController.login);

export default router;