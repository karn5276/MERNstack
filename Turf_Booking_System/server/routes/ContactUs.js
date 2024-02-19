const express = require("express")
const router = express.Router()
const contactController=require("../controllers/ContactUs");




router.post("/contactUs", contactController.contactUs);

module.exports = router;