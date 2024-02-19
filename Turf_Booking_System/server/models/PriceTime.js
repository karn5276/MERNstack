const mongoose = require("mongoose");

const priceTimeSchema = new mongoose.Schema({
    price:{
        type:Number,
        required:true,
        trim:true
    },
    time:{
        type:String,
        required:true,
        trim:true
    }
});

const Pricetime = mongoose.model("Pricetime",priceTimeSchema);
module.exports=Pricetime;