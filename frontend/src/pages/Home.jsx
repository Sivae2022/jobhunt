import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import jobimg from '../assets/jobimg.jpg'
import { Button } from '@/components/ui/button'
import AllJobs from '@/components/AllJobs'
import Footer from '@/components/Footer'
import { NavLink } from 'react-router'

const Home = () => {

  return (
    <div className='w-full '>
        <Navbar />

        <div className='main  mt-10'>
        <div className='flex flex-col sm:flex-row '>
                <div className='w-full sm:w-1/2 flex flex-col items-center gap-3 justify-center py-10 sm:py-0'>
                       <p className='font-medium  text-sm md:text-base'>FIND YOUR DREAM JOB TODAY</p>
                   <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>LATEST JOB OPENINGS</h1>
                   <div className='flex items-center mt-2 gap-2'>
                       <NavLink to="findjobs">
                       <Button className="py-7 px-7 rounded-lg text-base ">FIND A JOB</Button>
                       </NavLink>
                     
                   </div>
                </div>
                <img src={jobimg} alt="hero image" className='w-full sm:w-1/2' />
        </div>

        <div className=''>
               <div className=' sm:p-10'>
               <h2 className='text-3xl sm:text-5xl  text-center font-[700] py-3'>Latest and Top job openings</h2>
               </div>
             
             <div className='alljobs'>
               
              <AllJobs />
             
                
             </div>
        </div>

        </div>
       <Footer />       
    </div>
  )
}

export default Home
