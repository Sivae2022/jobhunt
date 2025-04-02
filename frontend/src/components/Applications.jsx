import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ChevronsDownIcon, Loader2,UserIcon } from 'lucide-react'
import toast from 'react-hot-toast'

const Applications = () => {
  const [loading, setloading] = useState(false)
  const [applications, setApplications] = useState([])
  const user = useSelector((state) => state.user.user)
  const jobids = user?.postedjobs || []
  const jobidstring = jobids.join(",");
  // console.log("jobidstring",jobidstring);

  useEffect(() => {

    // prevent api calls if no job ids
    if (!jobidstring) return
    const fetchApplications = async () => {

      try {
        setloading(true);
        const response = await axios.get(`http://localhost:3000/api/recruiter/getjobapplications/${jobidstring}`, { withCredentials: true })

        if (response.data.applications) {
          // console.log("applications", response.data.applications);
          setApplications(response.data.applications)
        }

      } catch (error) {
        console.error(error?.response?.data?.message || "Something went wrong");

      } finally {
        setTimeout(()=>{
          setloading(false);
        },1000)
      }
    }
    fetchApplications()
  }, [jobidstring])


  const HandleUpdateStatus = async(appliedjobid,newStatus)=>{
    try {
       const response = await axios.put(`http://localhost:3000/api/recruiter/updatejobstatus/${appliedjobid}`,{status:newStatus},{withCredentials:true})
       if(response.data){
       toast.success(response.data?.message || "Status updated successfully")
       console.log("update status",newStatus)

        // setApplications((prev)=>[...prev].map((item)=> item._id === appliedjobid ? {...item,status:newStatus}:item))
        setApplications((prevApplications)=>prevApplications.map((item)=> item._id === appliedjobid ? {...item,status:newStatus}:item))
      }
       
      
    } catch (error) {
      console.log(error?.response?.data?.message || "Something went wrong");
      toast.error(error?.response?.data?.message || "Something went wrong");
      
    }
  }
  return (
    <div>
      <p className='text-start font-[500] text-gray-600'>Job Applications</p>
      <div className='grid grid-cols-[1fr_2fr_3fr_1fr_1fr] gap-3 mt-2 items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>#</b>
        <b>Username</b>
        <b className='hidden md:inline'>Job Title</b>
        <b className='hidden md:inline'>Location</b>
        <b className='text-right md:text-center'>Action</b>
      </div>

      {
        loading ? (
          <div className='flex items-center justify-center mt-[50px]'>
            <Loader2 className='mx-auto  w-[100px] h-[100px] text-blue-500 animate-spin' />
          </div>
        ) : (
          applications?.length > 0 ? (
            applications.map((item, index) => {
              return (
                <div key={item._id} className='grid grid-cols-[1fr_2fr_3fr_1fr_1fr] mt-2 items-center py-1 px-2 border bg-gray-100 text-sm '>
                  <p>{index + 1}</p>
                  <p className=''>{item.userId?.name}</p>
                  <p className='hidden md:inline'>{item.jobId?.title}</p>
                  <p className='hidden md:inline'>{item.jobId?.location}</p>
                  <p className='text-center'>
                    <div className="group  p-2 relative flex justify-center items-center">
                      <span className='cursor-pointer hover:text-black mx-auto'><ChevronsDownIcon/></span>
                 <div className="group-hover:block hidden absolute  right-0 pt-4">
                   <div className="flex flex-col gap-2 w-30 py-3 px-5 bg-white shadow-md border  text-gray-500 rounded">
                        <select className='cursor-pointer p-2 ' value={ item.status || "pending"} onChange={(e)=>HandleUpdateStatus(item._id,e.target.value)}>
                          <option value="pending">Pending</option>
                            <option value="accepted" className='cursor-pointer'>Accepted</option>
                            <option value="rejected" className='cursor-pointer'>Rejected</option>
                        </select>
                   </div>
                 </div>
                 </div>
                 </p>
                </div>

              )
            })
          ) : (
            <p className='text-center text-gray-700 mt-10'>No applications found</p>
          )
        )
      }

    </div>
  )
}

export default Applications
