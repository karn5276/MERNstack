const mongoose=require("mongoose");


const ratingAndReview = new mongoose.Schema({
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
    },
    user:{
        type:String,
        ref:"User"
    }
});

const RatingAndReview=mongoose.model("RatingAndReview",ratingAndReview);

module.exports=RatingAndReview;