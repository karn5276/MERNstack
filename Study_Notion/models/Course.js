const mongoose=require("mongoose");


const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true
    },
    whatYouWillLearn:{
        type:String,
        required:true,
        trim:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    courseContent:[
        {
            type:String,
            required:true,
            ref:"Section"        
        }
    ],
    ratingAndReviews:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"  
    },
    price:{
        type:String,
        required:true
    },
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },
    thumbnail:{
        type:String,
        required:true
    },
    studentEnroll:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ]
});

const Course=mongoose.model("Course",courseSchema);

module.exports=Course;