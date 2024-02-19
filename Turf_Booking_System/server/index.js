const express=require("express");
const app = express();
require("dotenv").config();
const database = require("./config/database");
const cors = require("cors");

const userRoutes=require("./routes/User");
const contactRoute = require("./routes/ContactUs");
const turfRoute = require("./routes/Turf");
const reviewRoute = require("./routes/Review");
// const paymentRoutes=require("./routes/Payments");

const port = process.env.PORT;
const cookieParser=require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

app.use(cors());

database.connect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/turf",turfRoute);
app.use("/api/v1/review",reviewRoute);
// app.use("/api/v1/payment", paymentRoutes);


app.listen(port,()=>{
    console.log("app is listing on port: ",port);
})