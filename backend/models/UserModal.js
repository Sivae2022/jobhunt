import mongoose from "mongoose";

const UserScheama = new mongoose.Schema({
     name:{type: String,required: true},
     email:{type: String,required: true},
     password:{type: String,required: true},
     role:{type:String,required: true,enum:["jobseeker","recruiter"]},
     company:{type: String},
     appliedjobs:[{type:mongoose.Schema.Types.ObjectId,ref:"AppliedJob"}],
     skills:[{type: String}],
     bio:{type: String},
     created_at:{type:Date,default:Date.now},
     updated_at:{type:Date,default:Date.now}     
})

const userModal = mongoose.model("User",UserScheama);
export default userModal