const reviewSchema = require("../models/RatingAndReview");


module.exports.createReview = async(req,res)=>{
    try{
        const {rating,review} = req.body;
        const userId = req.user.id;


        // validation 
        if(!rating || !review){
            return res.status(401).json({
                success:false,
                message:"All Fields Are Required"
            })
        }

        // here only one review can give one user.
        const alreadyReviewed = await reviewSchema.findOne({
            user: userId,
        });

        if (alreadyReviewed) {
            return res.status(404).json({ success: false, message: "Already reviewed" });
        }

        // create review entry 

        const newReview = await reviewSchema.create({
            review,
            rating,
            user:userId
        });

        return res.status(200).json({
            success:true,
            message:"Rating added successfully",
            newReview
        })
    }
    catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"something went wrong while creating review"
        })
    }
}

// get all review and rating 

module.exports.allReview = async(req,res)=>{
    try{
        const allRating = await reviewSchema.find({});

        if(allRating){
            return res.status(404).json({
                success:false,
                message:'There Is No Rating Available'
            })
        }

        return res.status(200).json({
            success:true,
            message:"getting all ratings successfully",
            allRating
        });
    }
    catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"something went wrong while getting all review"
        })
    }
}