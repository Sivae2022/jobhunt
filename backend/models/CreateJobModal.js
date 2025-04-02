import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title:{type: String,required: true},
    description:{type: String,required: true},
    company:{type: String,required: true},
    location:{type: String,required: true},
    salary:{type: String,required: true},
    postedby:{type: mongoose.Schema.Types.ObjectId,ref:"Recruiter"},
    created_at:{type:Date,default:Date.now},
    applicants:[{type: mongoose.Schema.Types.ObjectId,ref:"User"}]
})

const jobModal = mongoose.model("Job",JobSchema);
export default jobModal