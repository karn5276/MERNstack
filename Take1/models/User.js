const mongoose = require("mongoose");

const profileSchema= new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    image:{
        url:String,
        filename:String,
        // default:"./images/default_image.jpg"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model("Profile",profileSchema);

module.exports=Profile;