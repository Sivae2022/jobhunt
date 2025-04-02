import recruiterModal from "../models/RecruiterModal.js";
import jobModal from "../models/CreateJobModal.js";
import appliedJobModal from "../models/AppliedJobModal.js";


export const CreateAjob = async(req,res)=>{
    try {
        const recruiterid = req.user.id
        console.log("id",recruiterid)
        const {title,description,company,location,salary} = req.body 

        // check recruiter exists or not 
        let recruiter = await recruiterModal.findById(recruiterid)

        if(!recruiter) return res.status(400).json({message:"Recruiter not found "})

        const jobPost = await jobModal.create({
            postedby:recruiterid,
            title,
            description,
            company,
            location,
            salary,
        })

        await recruiterModal.findByIdAndUpdate(recruiterid,{
            $push:{postedjobs:jobPost._id}
        })

        return res.status(200).json({message:"job post succesfully",jobPost})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error",error})
        
    }
}

export const GetAlljobs = async(req,res)=>{
    try {
        
        const Alljobs = await jobModal.find({}).populate("postedby")
        if(!Alljobs){
            return res.status(400).json({message:"No jobs found "})
        }
        return res.status(200).json({message:"all jobs",Alljobs})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error",error})
    }
}


export const GetEachJobdetails = async(req,res)=>{
    try {
        const id = req.params.id
        const job = await jobModal.findById(id).populate("postedby")
         

        if(!job){
            return res.status(400).json({message:"Job not found "})
        }

            return res.status(200).json({message:"Fetch job details",job})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error",error})
    }
}


export const getRecruiterjobs = async(req,res)=>{
    try {
        const recruiterid = req.user.id

         // check if user exists or not
         const recruiter = await recruiterModal.findById(recruiterid)

         if(!recruiter){
             return res.status(400).json({message:"User not found "})
         }

        const jobs = await recruiterModal.findById(recruiterid).populate("postedjobs")

        if(!jobs){
            return res.status(400).json({message:"No jobs found "})
        }
        return res.status(200).json({message:"jobs fetch successfully",jobs})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error",error})
        
    }
}

export const DeleteJob = async(req,res)=>{
    try {
        const recruiterid = req.user.id
        const jobid = req.params.id 
        
         // check if user exists or not
         const recruiter = await recruiterModal.findById(recruiterid)

         if(!recruiter){
             return res.status(400).json({message:"User not found "})
         }

        let job = await jobModal.findByIdAndDelete(jobid)

        if(!job){
            return res.status(400).json({message:"Job not found "})
        }

        await recruiterModal.findByIdAndUpdate(recruiterid,{
            $pull: {postedjobs: jobid}
        })
        
        return res.status(200).json({message:"Job deleted successfully "})
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error",error})
    }
}

export const updateRecruiterprofile = async(req,res)=>{
    try {
        const recruiterid = req.user.id
        const {name,email,phone,company,address} = req.body
         // check if user exists or not
         const recruiter = await recruiterModal.findById(recruiterid)
         if(!recruiter){
             return res.status(400).json({message:"User not found "})
         }

        const updatedprofile = await recruiterModal.findByIdAndUpdate(recruiterid,{name,email,company,phone,address},{new:true})
        return res.status(200).json({message:"profile updated succesfully",updatedprofile})
        
    } catch (error) {
        console.log(error)
        return  res.status(500).json({message:"Internal server error",error})
        
    }
}

export const getRecruiterprofile = async(req,res)=>{
    try {
        const recruiterid = req.user.id


        const recruiter = await recruiterModal.findById(recruiterid)
        if(!recruiter){
            return res.status(400).json({message:"User not found "})
        }

        return res.status(200).json({message:"profile fetch succesfully",recruiter})
        
    } catch (error) {
        console.log(error)
        return  res.status(500).json({message:"Internal server error",error})
    }
}




export const getJobApplicantions = async(req,res)=>{
    try {
        const jobid = req.params.id.split(",")
        // console.log("job id",jobid)
        const recruiterid = req.user.id

        // check if user exists or not
        const recruiter = await recruiterModal.findById(recruiterid)

        if(!recruiter){
            return res.status(400).json({message:"User not found "})
        }

        const job = await jobModal.findOne({_id:jobid,postedby:recruiterid})

        if(!job){
            return res.status(400).json({message:"Job not found "})
        }

        const applications = await appliedJobModal.find({jobId:jobid}).populate("userId","name phone status").populate("jobId","title company salary location")

        if(!applications){
            return res.status(400).json({message:"No applications found "})
        }

        return res.status(200).json({message:"Applications fetched successfully",jobtitle:job.title,applications})
        
    } catch (error) {
        console.log(error)
        return  res.status(500).json({message:"Internal server error",error})
        
    }
}




export const updateJobstatus = async(req,res)=>{
     try {
        const Appliedjobid = req.params.id
        const recruiterid = req.user.id
        const {status} = req.body;

         // check if user exists or not
         const recruiter = await recruiterModal.findById(recruiterid)
        
         if(!recruiter){
             return res.status(400).json({message:"User not found "})
         }

        if(!["accepted","rejected"].includes(status)){
            return res.status(400).json({message:"Invalid status.use accepted or rejected"})
        }

        const application = await appliedJobModal.findById(Appliedjobid).populate("jobId")

        if(!application){
            return res.status(400).json({message:"Application not found "})
        }

        application.status = status;
        await application.save()

        return res.status(200).json({message:"Application status updated",application})
        
     } catch (error) {
        console.log(error)
        return  res.status(500).json({message:"Internal server error",error})
        
     }
}