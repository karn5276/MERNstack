const mongoose = require("mongoose");


const userPriceHistorySchema = new mongoose.Schema({
    price:{
        type:String,
        default:null
    },
    time:{
        type:String,
        default:null,
    },
    turfId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Turf"
    }
});

const UserPriceHistory = mongoose.model("UserPriceHistory",userPriceHistorySchema);

module.exports=UserPriceHistory;