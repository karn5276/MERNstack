const mongoose=require("mongoose");


const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["Admin","User","Instructor"],
        required:true
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"  // this is model name
    },
    courses:[ // here we are used array b'coz user may have multiple courses.
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    image:{
        type:String,
        required:true
    },
    courseProgress:[ // multiple courses have multiple course progress
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ]
});

const User=mongoose.model("User",userSchema);

module.exports=User;