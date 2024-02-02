const profileSchema = require("../models/Profile");
const UserSchema = require("../models/User");

// here profile is already created during user login with null values we have simply update it.
exports.updateProfile = async(req,res)=>{
    try{
        // fetch data
        const {gender="",dateOfBirth="",about="",contactNumber=""}=req.body;

        const userId=req.user.id;

        // validation
        if(!gender || !dateOfBirth || !about || !contactNumber){
            return res.status(401).json({
                success:false,
                message:"all field are required"
            })
        }

        // find profile 
        const userDetails = await UserSchema.findById(userId);
        const profileId=userDetails.additionalDetails;
        const profileDetails=await profileSchema.findById({profileId});

        profileDetails.gender=gender;
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.contactNumber=contactNumber;

        profileDetails.save();

        // return responce 
        return res.status(200).json({
            success:true,
            message:"profile created successfully"
        });
    }
    catch(error){
        return res.status(500).json({
            success:true,
            message:"profile creation Unsuccessfully"
        });
    }
}

// delete account

exports.deleteAccount = async(req,res)=>{
    try{
        const id=req.user.id

        // validation
        const userDetails=await UserSchema.findById(id);
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"user not registerd to delete the account"
            })
        }

        // delete profile details 

        const profileId=userDetails.additionalDetails;
        await profileSchema.findByIdAndDelete({profileId});

        // delete user details

        await UserSchema.findByIdAndDelete({id});

        // return res
        return res.status(200).json({
            success:true,
            message:"Account Deleted Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:true,
            message:"Account deletion Unsuccessfully"
        });
    }
}

exports.getUserAllDetails = async(req,res)=>{
    try{
        const id = req.user.id;

        const userAllDetails = await UserSchema.findById({_id:id}).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"Account Details fetched Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:true,
            message:"Account Details fetched Unsuccessfully"
        });
    }
}