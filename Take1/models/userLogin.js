const mongoose = require("mongoose");


const userLoginSchema = new mongoose.Schema({
    userId:{
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

const Userlogin = mongoose.model("Userlogin",userLoginSchema);

module.exports=Userlogin;