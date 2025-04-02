import React, { useEffect, useState } from 'react'
import Jobcard from './Jobcard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { SetJobs } from '@/redux/JobSlice'
import { Loader2 } from 'lucide-react'
import { NavLink } from 'react-router'




const AllJobs = () => {
    const jobs = useSelector((state) => state.Jobs.jobs)
    // console.log("state",jobs)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/recruiter/getalljobs", { withCredentials: true })
                if (response.data) {
                    // console.log('jobs',response.data.Alljobs)
                    dispatch(SetJobs(response.data.Alljobs))
                }

            } catch (error) {
                console.log("failed to get jobs", error)
            }
        }
        fetchAllJobs()
    }, [])

    return (
        
        <div className="px-6 py-6 ">
            {jobs.length > 0 ? (
                Array.isArray(jobs) ? (
                    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        {jobs.map((job) => (
                              
                              <NavLink to={`/job/${job._id}`}>
                                  <Jobcard
                                key={job._id}
                                title={job.title}
                                description={job.description}
                                salary={job.salary}
                                location={job.location}
                                company={job.company}
                            />

                              </NavLink>
                          
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-700 mt-10">No Jobs found</p>
                )
            ) : (
        
                <div className="flex justify-center items-center">
                    <p className="text-center text-2xl text-gray-700">No jobs Found</p>
                </div>
            )}
        </div>


    )
}

export default AllJobs
