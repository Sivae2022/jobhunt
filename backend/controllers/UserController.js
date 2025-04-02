
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/UserModal.js";
import RecruiterModal from "../models/RecruiterModal.js"
import userModal from "../models/UserModal.js";
import appliedJobModal from "../models/AppliedJobModal.js";
import jobModal from "../models/CreateJobModal.js";


export const signup = async(req,res)=>{
     try {
        const {email,password,name,role,company} = req.body;

        //  check if user already exists
        
        const existingUser = await UserModal.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const existingRecruiter = await RecruiterModal.findOne({email});
        if(existingRecruiter){
            return res.status(400).json({message:"Recruiter already exists"});
        }

        // check role if user is jobseeker or recruiter 

        if(role === "jobseeker"){

            const hash = await bcrypt.hash(password,10);
            const user = await UserModal.create({
                email,
                password:hash,
                name,
                role
            })
            await user.save();
            return res.status(201).json({message:"Sign up successfully"});

        } else if(role === "recruiter"){
            const hash = await bcrypt.hash(password,10);

            if (!company) {
                return res.status(400).json({ message: "Company name is required for recruiters" });
            }

            const recruiter = await RecruiterModal.create({
                email,
                password:hash,
                name,
                company,
                role
            })
            await recruiter.save();
            return res.status(201).json({message:"Recruiter sign up successfully"});

        } else{
            return res.status(400).json({message:"Invalid role"});
        }
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }

}

export const Login = async(req,res)=>{
    try {
        const {email,password,role} = req.body;

        let user;
        // check if user exists or not //

        if(role === "jobseeker"){
            user = await UserModal.findOne({email});
        } else if(role === "recruiter"){
             user = await RecruiterModal.findOne({email});
        } else{
            return res.status(400).json({message:"Invalid role"});
        }

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        // check if password is correct or not //

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid password or email"});
        }
      
        // create token //
        const token = jwt.sign({id:user._id,role:role},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token,{httpOnly:true});
        
        return res.status(200).json({message:"Login successfully",token,user});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
        
    }
}

export const UpdateUserprofile = async(req,res)=>{
    try {
        const userid = req.user.id
        const {name,skills,email,bio} = req.body

        const updateduser = await userModal.findByIdAndUpdate(userid,{name,skills,email,bio},{new:true})

        return res.status(200).json({message:"profile updated successfully",updateduser})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export const GetUserprofile = async(req,res)=>{
    try {
        const userid = req.user.id

        const user = await userModal.findById(userid)

        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        return res.status(200).json({message:"profile fetch successfully",user})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}


export const applytojob = async(req,res)=>{
    try {
        const userId = req.user?.id 
        // console.log("userid",userId)
        const jobId = req.params.id 
        // check user exists or not 
        const user = await userModal.findById(userId)

        if(!user){
            return res.status(400).json({message:"User not found"})
        }

    //   check user login or not
        if (!userId) {
            return res.status(400).json({ message: "Login to apply job" });
        }

        // check if job exists
        const job = await jobModal.findById(jobId)

        if(!job){
            return res.status(400).json({message:"Job not found"})
        }

        // check if the user already apply to the job //
        const alreadyapplied = await appliedJobModal.findOne({userId,jobId})

        if(alreadyapplied){
            return res.status(400).json({message:"You already applied to this job"})
        }

        const appliedjob = await appliedJobModal.create({
             userId,
             jobId
        })

        await jobModal.findByIdAndUpdate(jobId,{$push:{applicants:userId}})

        await userModal.findByIdAndUpdate(userId,{$push:{appliedjobs:appliedjob._id}})

        return res.status(200).json({message:"job applied successfully",appliedjob})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
        
    }
}


export const AppliedJobs = async(req,res)=>{
    try {
        const userId = req.user.id 

        //   check user exists or not 
        const user = await userModal.findById(userId)
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        // find jobs where ths user has applied
        const appliedjobs = await appliedJobModal.find({userId}).populate("jobId","title company salary location")


        if(appliedjobs.length === 0 ){
            return res.status(404).json({message:"No jobs found"})
        }

        return res.status(200).json({message:"Applied jobs fetch successfully",appliedjobs})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
        
    }
}

export const Logout = async(req,res)=>{
    try {
        res.clearCookie("token",{httpOnly:true,})
        return res.status(200).json({message:"Logged out successfully"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
        
    }
}
