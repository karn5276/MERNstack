const express=require("express");
const router = express.Router();
const userLoginSchema=require("../models/userLogin");
const userSchema=require("../models/User");

// image upload packages.
const multer  = require('multer');
const {storage}=require("../cloudConfig/cloudinary");
const upload = multer({ storage });



router.get("/userLogin",(req,res)=>{
    res.render("user/login.ejs");
});

router.post("/profileUpload",upload.single('profile[image]'),async(req,res)=>{
    res.send("uploaded");
    console.log(req.file);
    console.log(req.body.profile);
    const { username } = req.body.profile || {};
    console.log(username);
    await userSchema.insertMany({
        name:username,
        image:{
            url:req.file.path,
            filename:req.file.filename,
        }
    });
});

router.post("/updateProfile",async(req,res)=>{
    let {userId,password }=req.body;
    console.log("user login credentials ==> ",req.body);
    console.log(userId,password);
    res.render("user/updateProfile.ejs");

    await userLoginSchema.insertMany({
        userId:userId,
        password:password
    });

});



module.exports=router;