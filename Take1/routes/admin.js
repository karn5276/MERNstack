const express = require("express");
const router = express.Router();
const adminLoginSchema = require("../models/AdminLogin");
const userSchema = require("../models/User");
const userLoginSchema = require("../models/userLogin");
const doneUserSchema = require("../models/DoneUser");




router.get("/createUser", (req, res) => {
    res.render("admin/createUser.ejs");
});

router.get("/createUserNew",async(req,res)=>{
    await userSchema.find().sort({ timestamp: -1 });

    await userSchema.find({}).limit(2).
        then(userdata => {
            console.log('First two documents:', userdata);
            res.render("admin/createUser.ejs", { userdata });
        })

        .catch(err => {
            console.error('Error fetching documents:', err);
        });

});

// done users
router.post("/doneusers/:id",async(req,res)=>{
    console.log(req.params);
    let {id}=req.params;
    const doneUserData = await userSchema.findByIdAndDelete(id);
    console.log(doneUserData);

    await doneUserSchema.insertMany(doneUserData);
    res.redirect("/viewUser");
});

router.get("/adminLogin", (req, res) => {
    res.render("admin/login.ejs");
});

router.post("/createUser", async (req, res) => {
    if(req.body){
        await adminLoginSchema.insertMany(req.body);
    }
    await userSchema.find().sort({ timestamp: -1 });

    const counts = userSchema.countDocuments();
    // if (counts > 2) {
    console.log(counts);
    await userSchema.find({}).limit(2).
        then(userdata => {
            console.log('First two documents:', userdata);
            res.render("admin/createUser.ejs", { userdata });
        })

        .catch(err => {
            console.error('Error fetching documents:', err);
        });
    // }
});

router.get("/viewUser", async (req, res) => {

    userSchema.find().sort({ timestamp: -1 });

    await userSchema.find({}).limit(2).
        then(docs => {
            // console.log('First two documents:', docs);
            res.render("admin/DashBoard.ejs", { docs });

        })
        .catch(err => {
            console.error('Error fetching documents:', err);
        });

});

// delete user

router.delete("/deleteUser/:id", async (req, res) => {
    console.log("request come");
    let { id } = req.params;
    const deletedUser = await userSchema.findByIdAndDelete(id);
    console.log("deleted user ==> ", deletedUser);
    res.redirect("/viewUser");
    // res.redirect(`/listings/${id}`);


});



module.exports = router;