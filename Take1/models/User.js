const mongoose = require("mongoose");

const profileSchema= new mongoose.Schema({
    userid:{
        type:Number
    },
    name:{
        type:String,
        required:true
    },
    image:{
        url:String,
        filename:String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model("Profile",profileSchema);

module.exports=Profile;