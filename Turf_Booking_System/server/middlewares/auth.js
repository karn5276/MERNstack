const jwt=require("jsonwebtoken");
require("dotenv").config();
// const {userSchema}=require("../schema.js");
const userSchema =require("../models/User");

module.exports.auth=async(req,res,next)=>{
    try{
        // extract token
        console.log("activated")
        console.log("cookie: ",req.cookies);
        console.log("body: ",req.body);

        const token = req.cookies.token 
                        || req.body.token 
                        // || req.header("Authorisation").replace("Bearer ", "");

        console.log("token: ",token);
        // if token missing return res
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        // verify token 

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log("decode: ",decode); // here in this decode our payload is save which is created during login
            req.user=decode;
        }
        catch(error){
            console.log(error);
            return res.status(401).json({
                success:false,
                message:"Token is Invalid"
            });
        }
        next();

    }
    catch(error){
        console.log(error);
            return res.status(500).json({
                success:false,
                message:"something went wrong while validating token"
            })
    }
}

// validate user 

module.exports.validateUser = (req,res,next)=>{
        let {error}=userSchema.validate(req.body);
        if(error){
            let errMsg = error.details.map((el)=>el.message).join(",");
            console.log("errMsg: ",errMsg);
        }
        else{
            next();
        }
    
}

// is student

module.exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.accountType!="Student"){
            return res.status.json({
                success:false,
                message:"This is protected route only for student"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while validating student"
        })
    }
}

// is instructor

module.exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.accountType!="Instructor"){
            return res.status.json({
                success:false,
                message:"This is protected route only for Instructor"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while validating Instructor"
        })
    }
}

// is admin

module.exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.accountType!="Admin"){
            return res.status.json({
                success:false,
                message:"This is protected route only for Admin"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while validating Admin"
        })
    }
}
