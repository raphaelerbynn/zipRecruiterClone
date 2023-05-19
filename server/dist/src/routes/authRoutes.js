"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../utils/middlewares");
const router = (0, express_1.Router)();
router.post("/register", middlewares_1.validateUserRegisterData, controllers_1.authController.register);
router.post("/login", middlewares_1.validateUserLoginData, controllers_1.authController.login);
exports.default = router;
