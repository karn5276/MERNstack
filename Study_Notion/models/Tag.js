const mongoose=require("mongoose");


const tagSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }
});

const Tag=mongoose.model("Tag",tagSchema);

module.exports=Tag;