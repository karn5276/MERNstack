const mongoose  = require("mongoose");

const turfSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    image:[{ // we have a functionality to add more than one images
        url:String,
    }],

    // reviews:[  // one turf have multiple reviews
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"RatingAndReview",
    //         required:true,
    //     }
    // ],
    area:{
        type:String,
    },
    city:{
        type:String,
        trim:true,
    },
    pincode:{
        type:Number,
        require:true,
    },
    // priceTime:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Pricetime",
    //     required:true,
    // }]
});

const Turf = mongoose.model("Turf",turfSchema);
module.exports=Turf;