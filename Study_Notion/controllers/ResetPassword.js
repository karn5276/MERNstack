const User = require("../models/User");
const bcrypt=require("bcryptjs")
const mailSender = require("../utils/mailSender");


exports.resetPasswordToken=async(req,res)=>{
    try{
        // fetch email 
        const {email}=req.body;

        // check email in database user exit or not
        const checkUser=await User.findOne({email});

        if(!checkUser){
            return res.status(401).json({
                success:false,
                message:"First register yourSelf"
            })
        }

        // generate token (this is an random token)
        const token = crypto.randomUUID();
        
        // update user schema by adding token and resetPasswordExpires time
        const userUpdateDetails=await User.findOneAndUpdate(
                                                    {email},
                                                    {
                                                        token:token,
                                                        resetPasswordExpires:Date.now()+5*60*1000
                                                    },
                                                    {new:true}
        )

        console.log("userUpdateDetails: ",userUpdateDetails)
        // create url
        const url = `http://localhost:3000/update-password/${token}`; // here we are include token in url only for producing new urls for new users.

        // send url to the user mail
        await mailSender(
            email,
            `password reset link`,
            `password reset link: ${url}`
        );

        return res.status(200).json({
            success:true,
            message:"Url send successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while reseting password"
        })
    }
}


// reset password

exports.resetPassword=async(req,res)=>{
    try{
        // fetch data 
        const {password,token,confirmPassword}=req.body;

        // check token is present or not
        const userDetails = await User.findOne({token});
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        // validation
        if(password!=confirmPassword){
            return res.status(401).json({
                success:false,
                message:"password not matching"
            })
        }

        // check token expire time
        if(userDetails.resetPasswordExpires<Date.now()){
            return res.status(401).json({
                success:false,
                message:"Token Time Expires"
            })
        }

        // hash new password

        var salt = bcrypt.genSaltSync(10);
        var hashedPassword =bcrypt.hashSync(password, salt);

        // update password

        await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});

        // return res
        return res.status(200).json({
            success:true,
            message:"password reset succssfully"
        })
    }
    
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while resetting the password"
        });
    }
}