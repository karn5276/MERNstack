const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        // required:true,
        default:null,
        trim:true
    },
    email:{
        type:String, 
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    contactNo:{
        type:Number,
        // required:true,
        trim:true,
        default:null
    },
    accountType:{
        type:String,
        enum:["Admin","User","Instructor"],
        required:true
    },
    token: {
        type: String,
    },
});

const User = mongoose.model("User",userSchema);

module.exports=User;