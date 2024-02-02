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
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
});

const RatingAndReview=mongoose.model("RatingAndReview",ratingAndReview);

module.exports=RatingAndReview;