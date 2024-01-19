const mongoose = require("mongoose");


const AdminLoginSchema = new mongoose.Schema({
    adminId:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Adminlogin = mongoose.model("Adminlogin",AdminLoginSchema);

module.exports=Adminlogin;