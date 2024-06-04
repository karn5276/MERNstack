// Import the required modules
const express = require("express")
const router = express.Router()

const paymentControllers = require("../controllers/Payments");

const { auth, isInstructor, isUser, isAdmin } = require("../middlewares/auth")
router.post("/capturePayment", auth, isUser, paymentControllers.capturePayment);
router.post("/verifyPayment",auth,paymentControllers.verifySignature);
router.post("/sendPaymentSuccessEmail", auth, paymentControllers.sendPaymentSuccessEmail);


module.exports = router;