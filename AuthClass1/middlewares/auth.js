const jwt=require("jsonwebtoken");
require("dotenv").config();


exports.auth=async(req,res,next)=>{
    try{
        // extract token

        let token=req.body.token || req.cookies.token;
        
        console.log(token);
        // if token missing return res
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        // verify token 

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET); // here jwt, decode our token means basically our token is encrypted and this jwt function decode that token and we can access the token field easily.

            console.log("decode: ",decode); // here in this decode our payload is save which is created during login
            req.user=decode; // 
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
        if(req.user.role!="Student"){
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


// is admin

exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.role!="Admin"){
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
