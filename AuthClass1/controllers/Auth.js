const UserSchema = require("../models/User");

require("dotenv").config();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.signUp = async(req,res)=>{
    try{
        // fetch data from req body
        let {
            name,
            email,
            password,
            role
        } = req.body;

        // check user already exit 

        let checkuser=await UserSchema.findOne({email});

        if(checkuser){
            return res.status(400).json({
                success:false,
                message:"user already registerd"
            });
        }

        // hash password
        var salt = bcrypt.genSaltSync(10); // this is length of salt which we want to insert in the password.
        var hashedPassword =bcrypt.hashSync(password, salt);


        // insert all data into the database

        const user=await UserSchema.create({
            name,
         
            password:hashedPassword,
            email,
           
            role,
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

exports.login=async(req,res)=>{

    try{
        // fetch data from req body
        const {email , password}=req.body;

        // check email and password present or not
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"all fields are required"
            });
        }

        // check user already registerd or not
        const user= await UserSchema.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not registred, Please Signup First"
            });
        }
        // check password

        const checkPassword=await bcrypt.compare(password,user.password);
 
        if(checkPassword){
            // generate jwt token after matching password
            const payload={
                email:user.email,
                id:user._id,
                role:user.role
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{ // here we are inserting payload
                expiresIn:"2h"
            });

            user.token=token;  // here we are add token in object not in database means there is no need to add token field in model schema.this we are doing only for sending the token in response with user object.
            user.password=undefined;

            // create cookie and send response

            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            };
            
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"logged in Successfully"
            });
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Incorrect Password"
            });
        }
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user Login unsuccessful"
        })
    }
}