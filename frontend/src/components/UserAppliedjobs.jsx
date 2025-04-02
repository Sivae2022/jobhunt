import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'
import { Loader2 } from 'lucide-react'


const UserAppliedjobs = () => {
    const [loading, setloading] = useState(false)
    const [appliedjobs, setappliedjobs] = useState([])

    useEffect(() => {
        const fetchappliedjobs = async () => {
            try {
                setloading(true)
                const response = await axios.get('http://localhost:3000/api/user/appliedjobs', { withCredentials: true })
                if (response.data) {
                    // console.log("data",response.data.appliedjobs)
                    setappliedjobs(response.data.appliedjobs)
                }

            } catch (error) {
                console.error("failed to load applied jobs", error.response?.data.message)
            } finally {
                setloading(false)
            }

        }
        fetchappliedjobs()
    }, [])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <p className="cursor-pointer">Applied jobs</p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle>All Applied jobs</DialogTitle>
                    <DialogDescription>
                        here you can check status of your job application
                    </DialogDescription>
                </DialogHeader>
                <div className=' p-10'>
                    <p className='text-start font-[500] text-gray-600'>Your applied applications</p>
                    <div className='grid grid-cols-[1fr_2fr_3fr_1fr_1fr] gap-3 mt-2 items-center py-1 px-2 border bg-gray-100 text-sm'>
                        <b>#</b>
                        <b>Date</b>
                        <b className='hidden md:inline'>Job Title</b>
                        <b className=''>Company</b>
                        <b className='text-right md:text-center'>Status</b>
                    </div>
                    <div>
                        {
                            loading ? (
                                <div className='flex items-center justify-center mt-[50px]'>
                                    <Loader2 className='mx-auto  w-[100px] h-[100px] text-blue-500 animate-spin' />
                                </div>
                            ) : (
                                appliedjobs.length > 0 ? (
                                    appliedjobs?.map((item, index) => {
                                        return (
                                            <div key={item._id} className='grid grid-cols-[1fr_2fr_3fr_1fr_1fr] gap-3 sm:gap-2  mt-2 items-center py-1 px-2 border bg-gray-100 text-sm '>
                                                <p>{index + 1}</p>
                                                <p className=''>{new Date(item.appliedAt).toLocaleDateString("en-IN")}</p>
                                                <p className='hidden md:inline'>{item.jobId?.title}</p>
                                                <p className=''>{item.jobId?.location}</p>
                                                <p className="text-center">
                                                    {
                                                        item.status === "pending" ? (
                                                            <span className='text-gray-500'>{item.status}</span>
                                                        ) : (
                                                            item.status === "rejected" ? (
                                                                <span className='text-red-500'>{item.status}</span>
                                                            ) : (
                                                                <span className='text-green-500'>{item.status}</span>
                                                            ))
                                                    }

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
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserAppliedjobs
