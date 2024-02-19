const turfSchema = require("../models/Turf");
const priceTimeSchema=require("../models/PriceTime");
const {uploadImageToCloudinary} =require("../utils/imageUploader");


module.exports.createTurf = async(req,res)=>{
    try{

        const {
            name,
            description,
            // price,
            // time,
            area,
            city,
            pincode
        }=req.body;

        // const images = req.file.image;
        console.log("req.file: ",req.file);
        console.log("req.body: ",req.body);


        // validation 
        if(!name || !description || !area || !city || !pincode){
            return res.status(401).json({
                success:false,
                message:"All Fields Are Required"
            })
        }

       	// Upload the Thumbnail to Cloudinary
		const image = await uploadImageToCloudinary(
			images,
			process.env.FOLDER_NAME
		);
		console.log(image);

        //create entry in database 

        const turfDetails = await turfSchema.create({
            name,
            description,
            images:image.secure_url,
            area,
            city,
            pincode
        });

        // return res

        return res.status(200).json({
            success:true,
            message:"Turf Entry Created Successfully",
            turfDetails
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while creating turf"
        })
    }
}