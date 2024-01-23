const UserSchema = require("../models/User");
const OTPSchema = require("../models/OTP");
const profileSchema=require('../models/Profile');
const otpGenerator = require("otp-generator");
const bcrypt=require("bcryptjs");



// send otp function

exports.sendOTP = async (req, res) => {
    try {

        // first fetch email from req body for sending mail to that mail

        let { email } = req.body;

        // check email already exit or not

        let checkUserPresent = await UserSchema.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({  // return indicated end of the function.
                success: false,
                message: "user already registered"
            })
        }

        // generate otp for sending to the user

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        console.log("otp generated: ", otp);

        // check otp already exit, we want a unique otp

        let result = await OTPSchema.findOne({ otp: otp });

        while (result) { // this while loop b'coz otp generator function generat otp and that otp matched to the exit otp again and again.
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

            console.log("generated OTP : ", otp)

            result = await OTPSchema.findOne({ otp: otp });
        }

        // save the otp and email in otp document

        let otpPayload = { email, otp };

        const otpBody = await OTPSchema.create(otpPayload);
        console.log("otp body: ", otpBody);

        res.status(200).json({
            success: true,
            message: "OTP send successfully"
        })

    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "OTP sent unsuccssful"
        })
    }
}

exports.signUp = async(req,res)=>{
    try{
        // fetch data from req body
        let {
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            contactNumber,
            accountType,
            otp
        } = req.body;

        // cheack all fields are present
        
        if(!firstname || !lastname || !email || !password || !confirmPassword || !otp || !contactNumber){
            return res.status(401).json({
                success:false,
                message:"all fields are required"
            });
        }

        // match confirm password with password

        if(password != confirmPassword){
            return res.status(400).json({
                status:false,
                message:"password does not matched with confirm password"
            })
        }

        // check user already exit 

        let checkuser=await UserSchema.findOne({email});

        if(checkuser){
            return res.status(400).json({
                success:false,
                message:"user already registerd"
            });
        }

        // find out the most recent otp to match the user otp.

        let recentOtp = await OTPSchema.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log("recent otp: ",recentOtp);

        if(otp!=recentOtp){
            return res.status(400).json({
                success:false,
                message:"Invalid Otp"
            });
        }

        // hash password
        var salt = bcrypt.genSaltSync(10); // this is length of salt which we want to insert in the password.
        var hashedPassword =bcrypt.hashSync(password, salt);

        // create additional details
        // here we are created initally null profile letter when user wants to enter his details then we will modify it.
        const profileDetails= await profileSchema.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        });

        // insert all data into the database

        const user=await UserSchema.create({
            firstname,
            lastname,
            password:hashedPassword,
            email,
            contactNumber,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
        });

        // return response

        return res.status(200).json({
            success:true,
            message:'user registerd successfully',
            user
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User can not be registerd please try again"
        })
    }
}