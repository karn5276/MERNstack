const sectionSchema=require("../models/Section");
const courseSchema=require("../models/Course");

exports.createSection = async(req,res)=>{
    try{
        // fetch data 
        const {sectionName,courseId} = req.body;

        // validation 

        if(!sectionName || !courseId){
            return res.status(401).json({
                success:false,
                message:"all fields are require"
            })
        }

        //create section entry

        const newSection=await sectionSchema.create({sectionName});

        // update course database or schame

        const updatedCourseDetails = await courseSchema.findByIdAndUpdate(
            {courseId},
            {
                $push:{
                    courseContent:newSection._id
                }
            },
            {new:true}
        )

        // return response
        return res.status(200).json({
            success:true,
            message:"section created successfully",
            updatedCourseDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while creating course."
        })
    }
}

exports.updateSection = async(req,res)=>{
    try{
        // fetch data 
        const {sectionName,sectionId}=req.body;

        // validation

        if(!sectionName || !sectionId){
            return res.status(401).json({
                success:false,
                message:"all fields are require"
            })
        }

        // update section 
        const section = await sectionSchema.findByIdAndUpdate({sectionId},{sectionName},{new:true});

        // return response
        return res.status(200).json({
            success:true,
            message:"section updated successfully",
            section
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while updating the section."
        })
    }
}

exports.deleteSection = async(req,res)=>{
    try{
        // fetch id from params
        const {sectionId} = req.params;

        // delete entry 
        await sectionSchema.findByIdAndDelete(sectionId);

        // return response
        return res.status(200).json({
            success:true,
            message:"section delted successfully"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while deleting section"
        });
    }
}
