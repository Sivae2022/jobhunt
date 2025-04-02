import RecruiterNavbar from '@/components/RecruiterNavbar'
import React, { useState } from 'react'
import { PlusIcon, ListOrdered, UserCheck } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'

const RecruiterDashboard = () => {
   
  return (
    <div className=' min-h-screen'>
         <RecruiterNavbar />
      <div className='alldata w-full flex'>

        <div className='leftside w-[18%] min-h-screen border-r-2'>
        <div className=' gap-5 flex flex-col py-10 font-[500] text-gray-600'>
                <NavLink to="/recruiterdashboard/addjob" className={({isActive})=>`border rounded-md py-3 px-3 transition-all duration-300 ${isActive ? "bg-blue-300 text-white":"bg-transparent"}`}>
                  <div className='flex items-center gap-4 '>
                    <PlusIcon />
                    <span className='hidden md:inline'>Add Job</span>
                 </div>
                </NavLink>
                <NavLink to="/recruiterdashboard/alljobs" className={({isActive})=>`border rounded-md py-3 px-3 transition-all duration-300 ${isActive ? "bg-blue-300 text-white":"bg-transparent"}`}>
                  <div className='flex items-center gap-4'>
                    <ListOrdered />
                    <span className='hidden md:inline'>Manage Jobs</span>
                 </div>
                </NavLink>
                <NavLink to="/recruiterdashboard/applications" className={({isActive})=>`border rounded-md py-3 px-3 transition-all duration-300 ${isActive ? "bg-blue-300 text-white":"bg-transparent"}`}>
                  <div className='flex items-center gap-4'>
                    <UserCheck/>
                    <span className='hidden md:inline'>View Applications</span>
                 </div>
                </NavLink>
                </div>

        </div>
        <div className='rightside w-[82%] mx-4  p-4  my-8 text-gray-600 text-base'>
          <Outlet />

        </div>

      </div>
      <Footer />
    </div>
  )
}

export default RecruiterDashboard
