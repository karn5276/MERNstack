const turfSchema = require("../models/Turf");
const userSchema = require("../models/User");
const priceTimeSchema = require("../models/PriceTime");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mongoose =require("mongoose");


module.exports.createTurf = async (req, res) => {
    try {
        const userId = req.user.id;

        let {
            turfName,
            turfDescription,
            area,
            city,
            pinCode
        } = req.body;

        const images = req.files.thumbnailImage;

        // validation 
        if (!turfName || !turfDescription || !area || !city || !pinCode) {
            return res.status(401).json({
                success: false,
                message: "All Fields Are Required"
            })
        }

        // check account type of user 

        const ownerDetails = await userSchema.findById(userId, {
            accountType: "Owner",
        });

        if (!ownerDetails) {
            return res.status(401).json({
                success: false,
                message: "Owner Details are not found"
            })
        }



        // Upload the Thumbnail to Cloudinary
        const image = await uploadImageToCloudinary(
            images,
            process.env.FOLDER_NAME
        );
        console.log(image);

        //create entry in database 

        const newTurf = await turfSchema.create({
            turfName,
            turfShortDesc:turfDescription,
            owner: ownerDetails._id,
            image: image.secure_url,
            area,
            city,
            pinCode,
            price:null,
            time:null
        });


        // add new turf details in owner fields

        await userSchema.findByIdAndUpdate({ _id: ownerDetails._id }, {
            $push: {
                turfs: newTurf._id,
            },
        },
            { new: true });

        // return res

        return res.status(200).json({
            success: true,
            message: "Turf Entry Created Successfully",
            data: newTurf
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while creating turf"
        })
    }
}

module.exports.addPriceTime = async (req, res) => {
    try {

        const userId = req.user.id;
        const { turfId } = req.body;
     
        const { data } = req.body;
        const user = await userSchema.findById({ _id: userId });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        };

        const timePriceDetails = new priceTimeSchema({ data: data });

        await timePriceDetails.save();

        const findTurf = await turfSchema.findById({ _id: turfId });

        if (!findTurf) {
            return res.status(401).json({
                success: false,
                message: "turf not found"
            })
        }
        const updatedTurf = await turfSchema.findByIdAndUpdate({ _id: turfId }, {
            priceTime: timePriceDetails._id
        })


        return res.status(200).json({
            success: true,
            message: "Price and Time Added Successfully",
            data: timePriceDetails
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Adding Price Time Failed"
        })
    }
}

module.exports.editPriceTime = async(req,res)=>{
    try{

        const {priceTimeId}=req.body;
        const userId = req.user.id;
        const {priceTime} = req.body;

        const updatedPriceTime = await priceTimeSchema.findByIdAndUpdate({_id:priceTimeId},
            {data:priceTime},{new:true});

        return res.status(200).json({
            success:true,
            message:"PriceTime updated successfully",
            data:updatedPriceTime
        })

    }
    catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"Price And Time Updated Successfully"
        })
    }
}

module.exports.editTurf = async (req, res) => {
    try {

        const { turfId } = req.body;

        const findTurf = await turfSchema.findById({ _id: turfId });

        if (!findTurf) {
            return res.status(401).json({
                success: false,
                message: "Turf Not Found"
            })
        }
        const updates = req.body;


        // If Thumbnail Image is found, update it
        if (req.files) {
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            findTurf.image = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                findTurf[key] = updates[key]
            }
        }

        await findTurf.save();

        const updatedTurf = await turfSchema.findById({ _id: turfId })
            .populate("owner")
            .populate("reviews")
            .populate("priceTime");

        return res.status(200).json({
            success: true,
            message: "Turf Updated Successfully",
            data: updatedTurf
        });
    }

    catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Editing Turf Failed"
        })
    }
}



module.exports.getOwnerTurf = async (req, res) => {
    try {

        const id=req.user.id;

        const turfDetails = await turfSchema.find({ owner: id }).populate("owner").populate("priceTime").exec();

        if (!turfDetails) {
            return res.status(401).json({
                success: false,
                message: "Turf Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "turf details fetch successfully",
            data: turfDetails
        });

    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "fetching turf details failed"
        })
    }
}
 //get full turf details
 module.exports.getFullTurfDetails = async (req, res) => {
	try {
	  const { turfId } = req.body
	//   const userId = req.user.id
	  const PreturfDetails = await turfSchema.findOne({
		_id: turfId,
	  })
		.populate("owner")
		.populate("priceTime")
        .populate({                    //only populate user name and image
            path:"reviews",
            populate:{path:"user"
            ,select:"firstName lastName accountType image"}
        })
		.exec()

	  if (!PreturfDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find course with id: ${turfId}`,
		})
	  }

      const priceTimeId = PreturfDetails.priceTime._id;
      const arr = PreturfDetails.priceTime.data;

      for(let key of arr){
        if(key.booked==1){
            const now = new Date();
            const currentHour = now.getHours()+1;
            const curr_time = parseInt(currentHour, 10);
            let turf_time = parseInt(key.time,10);

            if(turf_time!=10 && turf_time!=11 && turf_time!=12){
                turf_time=turf_time+12;
            }

            if(curr_time>turf_time){
                key.booked=0;
            }

        }
      }

      const newPriceTimeDetails = await priceTimeSchema.findByIdAndUpdate(priceTimeId,{data:arr},{new:true});

    //   console.log("updatedPriceTimeDetails: ",newPriceTimeDetails);

      const turfDetails = await turfSchema.findOne({
		_id: turfId,
	  })
		.populate("owner")
		.populate("priceTime")
        .populate({                    //only populate user name and image
            path:"reviews",
            populate:{path:"user"
            ,select:"firstName lastName accountType image"}
        })
		.exec()

        if (!turfDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find course with id: ${turfId}`,
            })
          }

        // console.log("updatedTurfDetails: ",turfDetails.priceTime.data);
  
	  return res.status(200).json({
		success: true,
		data: {
            turfDetails,
		},
        message:"full turf details fetched successfully"
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }



module.exports.getAllTurfs = async (req, res) => {
    try {
        const allTurfs = await turfSchema.find({}).populate("owner").exec();

        if (!allTurfs) {
            return res.status(401).json({
                success: false,
                message: "No Turf Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Turfs Fetch Successfully",
            data: allTurfs
        });

    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "fetch turfs failed"
        })
    }
}



module.exports.deleteTurf = async (req, res) => {
    try {
        const { turfId } = req.body;
        // find turf
        const turfDetails = await turfSchema.findById({_id:turfId});
        const priceTimeID=turfDetails.priceTime;


        if (!turfDetails) {
            return res.status(401).json({
                success: false,
                message: "Turf Not Found"
            })
        }

        // delete price time data 
        const deletedPriceTime = await priceTimeSchema.findByIdAndDelete({_id:priceTimeID});

        const deletedTurf = await turfSchema.findByIdAndDelete({ _id: turfId });

        // delete turf details from owner account
        await userSchema.findByIdAndUpdate(
            { _id: turfDetails.owner._id },
            {
                $pull:
                {
                    turfs: turfId
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Turf Registration Deleted Successfully"
        })

    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Turf Removing Failed"
        })
    }
}