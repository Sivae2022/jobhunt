import axios from 'axios';
import { Loader, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'


const ManageallJob = () => {
  const [loading,setloading] = useState(false)
  const [Jobs,setJobs] = useState([]);
     
      const DeleteJob =async(id)=>{
         try {
          const response = await axios.get(`http://localhost:3000/api/recruiter/deletejob/${id} `,{withCredentials:true})
          if(response.data){
             setJobs(Jobs.filter((item)=>item._id !== id))
          }
         } catch (error) {
          console.log(error);
          
         }
      }
      useEffect(()=>{
          const fetchjobs = async()=>{
            try {
              setloading(true);
              const response = await axios.get("http://localhost:3000/api/recruiter/getrecruiterjobs",{withCredentials:true});
              if(response.data){
                // console.log("data",response.data);
                setJobs(response.data.jobs.postedjobs)
                // console.log('jobs',Jobs);
              }
              
            } catch (error) {
              console.log(error);
              
            } finally{
              setTimeout(() => {
                setloading(false);
              }, 2000);
              
            }
          }
          fetchjobs()
      },[])
  return (
    <div>
       <div>
         <p className='text-start font-[500] text-gray-600'>Manage All Jobs</p>
            <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-3 mt-2 items-center py-1 px-2 border bg-gray-100 text-sm'>
                <b>#</b>
                <b>Job Title</b>
                <b className='hidden md:inline'>Date</b>
                <b className='hidden md:inline'>Location</b>
                <b className='text-center'>Applicants</b>
                <b className='text-right md:text-center'>Delete</b>
            </div>
               
            {
              loading ? (
                          <div className='flex items-center justify-center mt-[50px]'>
                                <Loader2 className='mx-auto  w-[100px] h-[100px] text-blue-500 animate-spin' />
                          </div>
                       
              ):( 
                Jobs.length > 0 ? (
                
                  Jobs.map((item,index)=>{
                    return(
                      <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] mt-2 items-center py-1 px-2 border bg-gray-100 text-sm'>
                      <p>{index + 1}</p>
                      <p>{item.title}</p>
                      <p className='hidden md:inline'>{new Date(item.created_at).toLocaleDateString("en-IN")}</p>
                      <p className='hidden md:inline'>{item.location}</p>
                      <p className='text-center'>{item.applicants?.length || 0}</p>
                      <p onClick={()=>DeleteJob(item._id)} className='cursor-pointer text-right md:text-center'>X</p>
                    </div> 
                    )
                  })
                

               ):(
                 <p className='text-center text-gray-700 mt-10'>No jobs found</p>
               )

              )
            }
       </div>
    </div>
  )
}

export default ManageallJob
