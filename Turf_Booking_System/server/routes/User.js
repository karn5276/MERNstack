// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const AuthControllers= require("../controllers/Auth");
const {auth,isStudent,isInstructor,isAdmin,validateUser}=require("../middlewares/auth");


// Route for user signup
router.post("/signup",validateUser, AuthControllers.signUp);

// Route for user login
router.post("/login", AuthControllers.login);

// Route for sending OTP to the user's email
router.post("/sendotp", AuthControllers.sendOTP);

// Export the router for use in the main application

module.exports = router;