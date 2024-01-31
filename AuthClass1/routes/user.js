const express=require("express");
const router=express.Router();

const {signUp,login} =require("../controllers/Auth");
const {isStudent,auth,isAdmin} = require("../middlewares/auth");

router.post("/login",login);
router.post("/signup",signUp);


// protected route

router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route to the student"
    })
});

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route to the admin"
    })
});

module.exports=router;