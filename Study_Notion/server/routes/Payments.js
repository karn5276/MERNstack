// Import the required modules
import { Router } from "express"
const router = Router()

import { capturePayment, verifySignature, sendPaymentSuccessEmail } from "../controllers/Payments"
import { auth, isInstructor, isStudent, isAdmin } from "../middlewares/auth"
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment",auth,verifySignature)
router.post("/sendPaymentSuccessEmail", auth, sendPaymentSuccessEmail)

export default router;
