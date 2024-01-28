import { Router } from "express";
import { login, signUp } from "../controllers/user.controller.js";

const router = Router()


// USER ROUTES

router.route("/create-user").post(signUp)
router.route("/login-user").post(login)



export default router;
