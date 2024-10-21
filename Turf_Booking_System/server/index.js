require("dotenv").config();
const express=require("express");
const app = express();
const database = require("./config/database");
const cors = require("cors");


// files upload packeged

const fileUpload = require("express-fileupload");
const { cloudinaryconnect } = require("./config/cloudinary");

// Route paths
const userRoutes=require("./routes/User");
const contactRoute = require("./routes/ContactUs");
const turfRoute = require("./routes/Turf");
const profileRoute = require("./routes/Profile");
const paymentRoutes=require("./routes/Payments");

const port = process.env.PORT || 4050;
const cookieParser=require("cookie-parser");

app.use(cookieParser());
app.use(express.json()); // parse client json data to js object.

app.use(cors());

// file upload 
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp",
    })
  );
  
cloudinaryconnect();
database.connect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/turf",turfRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/payment", paymentRoutes);


app.listen(port,()=>{
    console.log("app is listing on port: ",port);
});