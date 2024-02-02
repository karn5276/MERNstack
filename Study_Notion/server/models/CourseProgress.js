const mongoose=require("mongoose");


const courseProgress = new mongoose.Schema({
   
    courseId:{ // course progress must  have course to show that course progress.
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    completedVideo:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection" // model name alwayes start with capital letter.
        }
    ]

});

const CourseProgress=mongoose.model("CourseProgress",courseProgress);

module.exports=CourseProgress;