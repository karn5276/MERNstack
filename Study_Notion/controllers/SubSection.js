const subsectionSchema = require("../models/SubSection");
const sectionSchema=require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();


exports.createSubSection=async(req,res)=>{
    try{
        const {title,timeDuration,description,sectionId}=req.body;

        const video=req.files.videoFile;

        // validation

        if(!title || !timeDuration || !description || !sectionId || !video){
            return res.status(401).json({
                success:false,
                message:"all fields are require"
            })
        }

        // upload video to the cloudinary 
        
        const videoUrl = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        // create entry for subsection 
        const newSubSection = await subsectionSchema.create({
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoUrl:videoUrl,
        });

        // push subsection id in section 

        const updatedSection = await sectionSchema.findByIdAndUpdate(
            {sectionId},
            {
                $push:{
                    subSection:newSubSection._id
                }
            },
            {new:true}
            )

            return res.status(200).json({
                success:true,
                message:"subsection created successfully",
                updatedSection
            })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"subsection not created"
        })
    }
}

exports.updateSubSection=async(req,res)=>{
    try{
        const {title,subsectionId,timeDuration,description} = req.body;
      
        const video=req.files.videoFile;

        // validation

        if(!title || !timeDuration || !description || !sectionId || !video){
            return res.status(401).json({
                success:false,
                message:"all fields are require"
            })
        }

        // upload updated video to the cloudinary 

        const videoUrl = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        // update schema

        const updatedSubSection = await subsectionSchema.findByIdAndUpdate(
            {subsectionId},
            {
                title:title,
                description:description,
                timeDuration:timeDuration,
                videoUrl:videoUrl
            },
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"subsection updated successfully",
            updatedSubSection
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"subsection updation unsuccessfull"
        })
    }
}

exports.deleteSubsection = async(req,res)=>{
    try{
        const {subsectionId}=req.params;

        await subsectionSchema.findByIdAndDelete({subsectionId});

        return res.status(200).json({
            success:true,
            message:"subsection deletion successfully",
            updatedSection
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"subsection deletion unsuccessfull"
        })
    }
}