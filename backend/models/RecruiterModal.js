import mongoose from "mongoose";

const RecruiterScheama = new mongoose.Schema({
    name:{type: String,required: true},
    email:{type: String,required: true,unique: true},
    password:{type: String,required: true},
    company:{type: String,required: true},
    role:{type: String ,required: true,enum:["recruiter"]},
    phone:{type: String,},
    address:{type:String,},
    postedjobs:[{type:mongoose.Schema.Types.ObjectId,ref:"Job"}],
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now}
})

const recruiterModal = mongoose.model("Recruiter",RecruiterScheama);
export default recruiterModal



