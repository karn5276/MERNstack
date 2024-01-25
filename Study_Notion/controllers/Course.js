const User = require("../models/User");
const Tag = require("../models/Tag");
const Course=require("../models/Course");
const {uploadImageToCloudinary} =require("../utils/imageUploader");
const { isInstructor } = require("../middlewares/auth");

exports.createCourse=async(req,res)=>{
    try{
        // fetch data 
        const {courseName,courseDescription,price,tag,whatYouWillLearn} = req.body;

        // fetch thumbnail image
        const thumbnail=req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !price || !tag || !whatYouWillLearn || !thumbnail){
            return res.status(401).json({
                success:false,
                message:"all fields are require"
            })
        }

        //   check isInstructor login or sign up or exits or not

        let userId=req.user.id;
        const InstructorDetails=await User.findById(userId);
        console.log("InstructorDetails: ",InstructorDetails);

        if(!InstructorDetails){
            return res.status(401).json({
                success:false,
                message:"Instructor not registerd or exit"
            })
        }

        // check tag is valid or not
        // note: in course schema we have tag objectId means tag which is come in req body is an ID.

        const tagDetails=await Tag.findById({tag});
        console.log("tagDetails: ",tagDetails);

        if(!tagDetails){
            return res.status(401).json({
                success:false,
                message:"tag is not exit"
            })
        }

        // upload image to the cloudinary

        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        // Create an entry for new course

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            price,
            whatYouWillLearn,
            instructor:InstructorDetails._id,
            thumbnail:thumbnailImage.secure_url,
            tag:tagDetails._id
        });

        // insert courseId to the user schema b'coz this schema is same for admin , instructor , and student and when new course is created there is instructor also have.

        await User.findByIdAndUpdate(
            {_id:InstructorDetails._id},
            {
                $push:{ // b'coz it is array of obj and here we are push new object to the array
                    courses:newCourse._id
                }
            },
            {new:true}
        )

        // update the tag

        const updatedTag = await Tag.findByIdAndUpdate({tag},{course:newCourse._id});
        console.log("updatedTag: ",updatedTag);

        // return response

        return res.status(200).json({
            success:true,
            message:"course created successfully"
        });


    }
    catch(error){
        return res.status(501).json({
            success:false,
            message:"something went wrong of creating course"
        })
    }
}

// fetch all courses 

exports.showAllCourses = async(req,res)=>{
    try{
        const allCourses = await Course.find({});

        return res.status(200).json({
            success:true,
            message:"All Course Data Fetch Successfully",
            data:allCourses
        })
    }
    catch(error){
        return res.status(501).json({
            success:false,
            message:"something went wrong of fetching all courses data"
        })
    }
}