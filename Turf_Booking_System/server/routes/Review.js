const express = require("express");
const router = express.Router();

const reviewControllers = require("../controllers/RatingAndReview");
const {auth,isStudent}=require("../middlewares/auth");

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, reviewControllers.createReview)
router.get("/getReviews", reviewControllers.allReview);

module.exports = router;
