const express=require("express");
const app = express();

// importing .env file
require("dotenv").config();
const port=process.env.PORT || 4000;

app.use(express.json());

// importing database.js and call database

require("./config/database").connect();

// import route and mount
const user=require('./routes/user');
app.use('/api/v1',user);

// activate server
app.listen(port,()=>{
    console.log("app listning on port 8080");
})