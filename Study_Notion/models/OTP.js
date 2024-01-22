const mongoose=require("mongoose");


const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    otp:{
        type:Number,
        trim:true,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});

const Otp=mongoose.model("Otp",OTPSchema);

module.exports=Otp;