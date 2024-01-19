const express=require("express");
const router = express.Router();
const adminLoginSchema=require("../models/AdminLogin");
const userSchema=require("../models/User");
const userLoginSchema=require("../models/userLogin");




router.get("/createUser",(req,res)=>{
    res.render("admin/createUser.ejs");
});


router.get("/adminLogin",(req,res)=>{
    res.render("admin/login.ejs");
});

router.post("/createUser",async(req,res)=>{
    await adminLoginSchema.insertMany(req.body);
   await userLoginSchema.find().sort({ timestamp: -1 });
    await userLoginSchema.find({}).limit(2).
    then(docs => {
        // console.log('First two documents:', docs);
        res.render("admin/createUser.ejs",{docs});

    })
    .catch(err => {
        console.error('Error fetching documents:', err);
    });
});

router.get("/viewUser",async(req,res)=>{

    userSchema.find().sort({ timestamp: -1 });

    await userSchema.find({}).limit(2).
    then(docs => {
        // console.log('First two documents:', docs);
        res.render("admin/DashBoard.ejs",{docs});

    })
    .catch(err => {
        console.error('Error fetching documents:', err);
    });

});

// delete user

router.delete("/deleteUser/:id",async(req,res)=>{
    console.log("request come");
    let {id} = req.params;
    const deletedUser = await userSchema.findByIdAndDelete(id);
    console.log("deleted user ==> ",deletedUser);
    res.redirect("/viewUser");
    // res.redirect(`/listings/${id}`);
    

});



module.exports=router;