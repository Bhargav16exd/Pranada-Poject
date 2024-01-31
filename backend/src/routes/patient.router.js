import {Router} from "express"
import { createPatientProfile, deletePatientProfile, patientProfile, updateProfile } from "../controllers/patient.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

// Patient Routes

router.route("/create-patient").post(authMiddleware,createPatientProfile)
router.route("/update-patient/:id").patch(authMiddleware,updateProfile)
router.route("/delete-patient/:id").delete(authMiddleware,deletePatientProfile)
router.route("/get-patient/:id").get(authMiddleware,patientProfile)

export default router