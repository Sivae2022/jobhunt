import express from "express"
import { AuthMiddleware } from "../middleware/Authmiddleware.js";
import { CreateAjob, DeleteJob,  GetAlljobs, GetEachJobdetails, getJobApplicantions,  getRecruiterjobs, getRecruiterprofile, updateJobstatus, updateRecruiterprofile } from "../controllers/RecruiterController.js";

const router = express.Router();


router.post('/createjob',AuthMiddleware,CreateAjob)
router.get('/getalljobs',GetAlljobs)
router.get('/getEachjob/:id',GetEachJobdetails)
router.get('/getrecruiterjobs',AuthMiddleware,getRecruiterjobs)
router.get('/deletejob/:id',AuthMiddleware,DeleteJob)
router.post('/Updaterecruiterprofile',AuthMiddleware,updateRecruiterprofile)
router.get('/getrecruiterprofile',AuthMiddleware,getRecruiterprofile)
router.get('/getjobapplications/:id',AuthMiddleware,getJobApplicantions)
router.put('/updatejobstatus/:id',AuthMiddleware,updateJobstatus)

export default router