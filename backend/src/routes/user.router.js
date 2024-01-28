import { Router } from "express";
import { signUp } from "../controllers/user.controller.js";

const router = Router()


// USER ROUTES

router.route("/create-user").post(signUp)


export default router;
