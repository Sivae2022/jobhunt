import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Button } from './ui/button'
import { useParams } from 'react-router'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'


const EachJobdetail = () => {
   
const user = useSelector((state)=>state.user.user)
 console.log('user',user)


    const [loading,setloading] = useState(false)
 const {id} = useParams()
//  console.log(id,id)
 const [job,setjob] = useState(null)
//  console.log(job)


      const handleApplytojob = async()=>{

        if(!user || !user.token){
            toast.error("please login to apply the job")
            return
        }
        try {
            const response = await axios.post(`http://localhost:3000/api/user/applyjob/${id}`,{},{withCredentials:true,headers:{
                Authorization: `Bearer ${user.token}`
            }})
            if(response.data){
                toast.success(response.data?.message || "Job Applied successfully 😄")
            }
        } catch (error) {
            console.log("failed to apply",error)
            toast.error(error.response?.data?.message || "something went wrong")
            
        }
      }
     useEffect(()=>{
        const fetchjobdetail = async()=>{
            try {
                setloading(true)
                const response = await axios.get(`http://localhost:3000/api/recruiter/getEachjob/${id}`,{withCredentials:true})
                if(response.data){
                    setjob(response.data)
                }
                
            } catch (error) {
                console.log("failed to load details",error)
            }finally{
                setTimeout(()=>{
                    setloading(false)
                },1000)
            }
        }
        fetchjobdetail()
       
     },[id])
  return (
    <div>
        <Navbar />
        {
            loading ? (
                <div className='flex justify-center items-center mt-12'>
                    <Loader2 className='w-20 h-20 animate-spin' />
                </div>

            ): job ? (
                <div className=' mt-12 flex flex-col gap-5 p-5'>
                <div className='flex justify-between '> 
                    <div className=''>
                        <p className='text-2xl font-bold'>{job.job?.title}</p>
                        <p className=' text-gray-500'>${job.job?.salary}</p>
                    </div>
                    <div>
                        <Button onClick={handleApplytojob} className="hover:bg-gray-600">Apply now</Button>
                    </div>
                </div>
               <div className='flex flex-col gap-4'>
                  <p className='text-lg font-[600]'>Job Description</p>
                  <hr className='mt-5' />
                  <div className='flex flex-col gap-2 '>
                      <p className='font-bold text-lg'>Role : <span className='font-[400] text-gray-600'>{job.job?.title}</span></p>
                      <p className='font-bold text-lg' >location : <span className='font-[400] text-gray-600'>{job.job?.location}</span></p>
                      <p className='font-bold text-lg'>Description : <span className='font-[400] text-gray-600'>{job.job?.description}</span></p>
                      <p className='font-bold text-lg '>Total Applicants : <span className='font-[400] text-gray-600'>{job.job?.applicants?.length || "0"}</span></p>
                      <p className='font-bold text-lg'>posted Date : <span className='font-[400] text-gray-600'>{new Date(job.job?.created_at).toLocaleDateString("en-IN")}</span></p>
                       <p className='font-bold text-lg'>posted By : <span className='font-[400] text-gray-600'>{job.job?.postedby.name}</span></p>
                  </div>
               </div>
               </div>
           

            ):(
                <div className='flex justify-center mt-12 items-center'>
                <p className='text-2xl font-bold'>No job details found</p>
            </div>

            )
        }
     

               
    </div>
  )
}

export default EachJobdetail
