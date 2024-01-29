import { Router } from "express";
import { changePassword, changeRole, login, profile, signUp } from "../controllers/user.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router()


// USER ROUTES

router.route("/create-user").post(signUp)
router.route("/login-user").post(login)

// Loggedin Routes
router.route("/get-user").post(profile)

//ADMIN Routes

router.route("/change-password").post(authMiddleware,isAdmin , changePassword)
router.route("/change-role").post(authMiddleware,isAdmin , changeRole)


export default router;
