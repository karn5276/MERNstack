const jwt=require("jsonwebtoken");
require("dotenv").config();


exports.auth=async(req,res,next)=>{
    try{
        // extract token

        let token=req.cookie.token || req.body.token || req.header("Authorisation").replace("Bearer ","");

        // if token missing return res
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        // verify token 

        try{
            const decode=await jwt.verify(token,process.env.JWT_SECRET);
            console.log("decode: ",decode);
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
            return res.status(500).json({
                success:false,
                message:"something went wrong while validating token"
            })
    }
}

// is student

exports.isStudent = async(req,res,next)=>{
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

exports.isInstructor = async(req,res,next)=>{
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

exports.isAdmin = async(req,res,next)=>{
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
