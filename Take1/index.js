const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require('path');
const methodOverride=require("method-override");
require("dotenv").config();
const userRouter=require("./routes/user");
const adminRouter=require("./routes/admin");

const port=8000;


// Configure to serve static files from the 'images' folder
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(express.json());

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


app.use("/",userRouter);
app.use("/",adminRouter);


app.get("/",(req,res)=>{

    res.send("home route");
})

app.listen(port,()=>{
    console.log("app is listning on port ",port);
});


