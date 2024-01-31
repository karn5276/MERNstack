const mongoose=require("mongoose");
// import env file 
require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("db connection successful"))
    .catch((err)=>{
        console.log("db connection issues");
        console.log(err); 
        process.exit(1);
        });
}