const RatingAndReview = require("../models/RatingAndReview")
const Course = require("../models/Course");


exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;


        const courseDetails = await Course.find({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } }
        }); // here we simply match user is enrolled in course or not b'coz only enrolled user can give the review.

        if (!courseDetails) {
            return res.status(404).json({ success: false, emessage: "Student not enrolled in course" });
        };

        // here only one review can give one user.
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        });

        if (alreadyReviewed) {
            return res.status(404).json({ success: false, message: "Already reviewed" });
        }

        // create rating entry
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId
        });
 
        // update course schema
        await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id
                }
            });

        res.status(200).json({
            success: true,
            message: "Rating added successfully",
            ratingReview
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: error.message
         });
    }
}


// get average rating
exports.getAverageRating = async (res,req)=>{
    try {
        const courseId=req.body.courseId;
        const result= await RatingAndReview.aggregate([
            {
                $match:{ // first match same courses
                    course:new mongoose.Types.ObjectId(courseId),
                }
            },
            {  // then group that courses and find average value of rating of that group courses. basically courses have multiple ratings and reviews
                $group:{
                    _id:null,
                    averageRating: {$avg:"$rating"}
                }
            }
        ]);

        if(result.length > 0) {
            return res.status(200).json({averageRating: result[0].averageRating});
        }
        else{
            return res.status(200).json({message: "Average rating is 0",
        averageRating:0});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

// get all ratings

exports.getAllRating = async (req,res) => {
    //get sorted by rating
    try {
        const allReviews = await RatingAndReview.find()
            .sort({rating: -1})
            .populate({
                path: "user",
                select: "firstName lastName email image" // only populate this 4 fields
            })
            .populate({
                path: "course",
                select: "courseName"
            })
            .exec();
            
        return res.status(200).json({
            success: true,
            message:"all reviews fetched successfully",
            data:allReviews,
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}