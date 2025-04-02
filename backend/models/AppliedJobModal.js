import mongoose from "mongoose";

const AppliedJobSchema = new mongoose.Schema({
         jobId:{type: mongoose.Schema.Types.ObjectId,ref:"Job",required:true},
         userId:{type: mongoose.Schema.Types.ObjectId,ref:"User",required:true},
         status:{type: String,enum:["pending","accepted","rejected"],default:"pending",},
         appliedAt:{type:Date,default:Date.now},
})

const appliedJobModal = mongoose.model("AppliedJob",AppliedJobSchema);
export default appliedJobModal