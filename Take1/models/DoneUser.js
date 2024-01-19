const mongoose = require("mongoose");

const DoneUserSchema= new mongoose.Schema({
    
    userId:{
        type:Number,
        rewquire:true
    },
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

const Doneuser = mongoose.model("Doneuser",DoneUserSchema);

module.exports=Doneuser;