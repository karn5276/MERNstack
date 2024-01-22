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

router.post("/updateProfile",async(req,res)=>{
    let {userId,password }=req.body;

    console.log("user login credentials ==> ",req.body);
    console.log(userId,password);

    await userLoginSchema.insertMany({
        userId:userId,
        password:password
    });

    const userData=await userLoginSchema.find({userId:userId}).limit(1);
    console.log("userData : ",userData);
    res.render("user/updateProfile.ejs",{userData});


});

router.post("/profileUpload/:id",upload.single('profile[image]'),async(req,res)=>{
    res.send("uploaded");
    console.log("req.params.id ==> ",req.params.id);
    console.log(req.file);

    const userLoginInfo=await userLoginSchema.findById(req.params.id);
    console.log(req.body.profile);
    
    console.log("userLoginInfo ",userLoginInfo);
    const { username } = req.body.profile || {};
    console.log(username);
    await userSchema.insertMany({
        userid:userLoginInfo.userId,
        name:username,
        image:{
            url:req.file.path,
            filename:req.file.filename,
        }
    });
});

// status

router.get("/status/:id",async(req,res)=>{
    let {id}=req.params;
    console.log(id);
})





module.exports=router;