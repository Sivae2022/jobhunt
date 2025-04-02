import React from 'react'
import { Button } from './ui/button'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { SetAuthUser } from '@/redux/UserSlice'
import { useNavigate } from 'react-router-dom'
import { LogOutIcon, User2Icon, UserCog2Icon } from 'lucide-react'
import Myprofile from './Myprofile'
import Editprofile from './Editprofile'

const RecruiterNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = async()=>{
        try {
           const response = await axios.get("http://localhost:3000/api/user/logout",{withCredentials:true})
           if(response.data){
            console.log(response.data);
              toast.success(response.data?.message || " logged out successfully");
              navigate('/')
              dispatch(SetAuthUser(null))
              
           }
          
        } catch (error) {
          console.log(error)
        }
      }



  return (
    <div>
        <div className='flex justify-between items-center border-b m-2 sm:px-4 py-2 '>
           <span className="text-[1rem] sm:text-2xl  text-black font-bold" >JobHunt</span>
           
            <div>
                <div className='group p-2 relative flex items-center justify-center '>
                    <span className=' cursor-pointer'><User2Icon className='w-8 h-8' /></span>
                  <div className='absolute top-0 right-0 w-[200px] cursor-pointer hidden group-hover:block'>
                      <div className='flex flex-col gap-4 border-2 p-5 bg-white rounded-md'>
                        <div className='flex gap-2 hover:bg-gray-200 rounded-md p-2 '>
                            <User2Icon />
                            <Myprofile />
                        </div>
                        <div className='flex gap-2  hover:bg-gray-200 rounded-md p-2  '>
                            <UserCog2Icon />
                            <Editprofile />
                        </div>
                        <div className='flex gap-2  hover:bg-gray-200 rounded-md p-2 '>
                        <LogOutIcon />
                        <p onClick={handleLogout} className='cursor-pointer text-base text-gray-700'>Logout</p>
                        </div>

                         
                      </div>
                     
                  </div> 
                </div>
                {/* <Button onClick={handleLogout} >Logout</Button> */}
            </div>
        </div>
    </div>
  )
}

export default RecruiterNavbar
