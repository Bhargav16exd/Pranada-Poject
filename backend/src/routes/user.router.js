import { Router } from "express";
import { login, profile, signUp } from "../controllers/user.controller.js";

const router = Router()


// USER ROUTES

router.route("/create-user").post(signUp)
router.route("/login-user").post(login)
router.route("/get-user").post(profile)




export default router;
