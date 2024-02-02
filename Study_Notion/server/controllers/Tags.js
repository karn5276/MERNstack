const tag = require("../models/Tag");

// createtag handler function

exports.createTag=async(req,res)=>{
    try{
        // fetch data 
        const {name , description}=req.body;

        // validation
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"all tags field are required"
            });
        }

        // insert data into tag schema
        const tagDetails = await tag.create({
            name:name,
            description:description
        });

        console.log("tagDetails: ",tagDetails);
        return res.status(200).json({
            success:true,
            message:"tag inserted to database successfully"
        });


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// show all tag handler function

exports.showAllTags=async(req,res)=>{
    try{
        const allTags=await tag.find({},{name:true , description:true});
        console.log("alltags: ",allTags);

        return res.status(200).json({
            success:true,
            message:"all tag retured successfully",
            allTags
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}