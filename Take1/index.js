const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require('path');
const methodOverride=require("method-override");
const userSchema=require("./models/User");
const userLoginSchema=require("./models/userLogin");
const adminLoginSchema=require("./models/AdminLogin");
require("dotenv").config();


const port=8000;

// image upload packages.
const multer  = require('multer');
const {storage}=require("./cloudConfig/cloudinary");
const upload = multer({ storage });

app.use(express.json());
// app.use(upload.none());





app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Admin-Managed_User_Access&Image_Cropping");
}


app.get("/adminLogin",(req,res)=>{
    res.render("admin/login.ejs");
});

app.post("/createUser",async(req,res)=>{
    await adminLoginSchema.insertMany(req.body);
    res.render("admin/createUser.ejs");
});

app.get("/viewUser",async(req,res)=>{

    userSchema.find().sort({ timestamp: -1 });

    await userSchema.find({}).limit(2).
    then(docs => {
        console.log('First two documents:', docs);
        res.render("admin/DashBoard.ejs",{docs});

    })
    .catch(err => {
        console.error('Error fetching documents:', err);
    });

});

app.post("/profileUpload",upload.single('profile[image]'),async(req,res)=>{
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

app.get("/userLogin",(req,res)=>{
    res.render("user/login.ejs");
});

app.post("/updateProfile",async(req,res)=>{
    let {userId,password }=req.body;
    console.log("user login credentials ==> ",req.body);
    console.log(userId,password);
    res.render("user/updateProfile.ejs");

    await userLoginSchema.insertMany({
        userId:userId,
        password:password
    });

});







app.get("/",(req,res)=>{

    res.send("home route");
})

app.listen(port,()=>{
    console.log("app is listning on port ",port);
});


