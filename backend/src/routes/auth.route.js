
import { Router } from "express";
import {
    registerController,
    verifyEmail,
    loginController,
    getMe
} from "../Controller/auth.controller.js";
import {
    registerValidator,
    loginValidator
} from "../validators/auth.validator.js";
import { authUser } from "../middleware/authUser.middleware.js";

const authRouter = Router();

/*
 *@ POST
 *@ Public
 *@ Purpose: Register user
 *@ Returns: User details
 */
authRouter.post("/register", registerValidator, registerController);

/*
 *@ GET
 *@ Public
 *@ Purpose: Verify email
 *@ Returns: Verification status
 */
authRouter.get("/verify-email", verifyEmail);

/*
 *@ POST
 *@ Public
 *@ Purpose: Login user
 *@ Returns: User details + JWT cookie
 */
authRouter.post("/login", loginValidator, loginController);

/*
 *@ GET
 *@ Protected
 *@ Purpose: Get current user
 *@ Returns: Authenticated user details
 */
authRouter.get("/get-me", authUser, getMe);

export default authRouter;
