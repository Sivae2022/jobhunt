import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import RecruiterRoute from "./routes/RecruiterRoute.js"




dotenv.config();

const port = process.env.PORT || 5000;
const app = express();


app.use(cors(
    {
        origin:["http://localhost:5174","http://localhost:5173"],
        credentials:true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




// routes //
app.use("/api/user",UserRoute);
app.use("/api/recruiter",RecruiterRoute)


// connect to database //
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to database")
}).catch((error)=>{
    console.log("Error connecting to database", error)
})



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})