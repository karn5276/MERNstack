const express=require("express");
const router=express.Router();
const turfController = require("../controllers/Turf");



router.post("/create",turfController.createTurf);

module.exports=router;