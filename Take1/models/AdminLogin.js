const mongoose = require("mongoose");


const AdminLoginSchema = new mongoose.Schema({
    adminId:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

const Adminlogin = mongoose.model("Adminlogin",AdminLoginSchema);

module.exports=Adminlogin;