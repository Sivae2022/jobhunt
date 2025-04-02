import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { SetAuthUser } from '@/redux/UserSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
const Login = () => {
  const navigate = useNavigate();
  const [loading,setloading] = useState(false);
  const dipatch = useDispatch();
  const { register, handleSubmit, formState:{ errors} } = useForm();
  const onSubmit = async (data) => {
       try {
        setloading(true);
         const response = await axios.post("http://localhost:3000/api/user/login",data,{withCredentials:true});
         if(response.data){
          console.log(response.data.token);
          toast.success(response.data?.message || "User logged in successfully");
          if(response.data?.user?.role === "jobseeker"){
            navigate("/");
          } 

          if(response.data?.user?.role === "recruiter"){
            navigate("/recruiterdashboard/addjob");
          }
          dipatch(SetAuthUser({...response.data?.user,token:response.data.token}))
         }
        
       } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Something went wrong");

       } finally{
        setloading(false);
       }
    };

  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='border-2 rounded-md shadow-md w-full sm:max-w-[400px] p-4'>
            <h3>Welcome Back! <br />  
                 <span className="text-gray-500">Please login to your account</span>
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} action="" className='flex flex-col gap-2 w-full   mt-4'>
                <label className='text-black-500'>Email</label>
                <input type="email" placeholder="Enter your email" className="py-2 px-1 rounded-md border " {...register("email", { required: true })}/>
                {errors.email && <div className="text-red-500">This field is required</div>}
                <label className='text-black-500'>Password</label>
                <input type="password" placeholder="Enter your password" className="py-2 px-1 rounded-md  border" {...register("password", { required: true })} />
                {errors.password && <div className="text-red-500">This field is required</div>}
                <label className='text-black-500 '>Select a role</label>

                <select className='role py-2 px-1  space-x-2 rounded-md border' {...register("role", { required: true })} >
                    <option value="jobseeker">Jobseeker</option>
                    <option value="recruiter">Recruiter</option>
                </select>
                {errors.role && <div className="text-red-500">This field is required</div>}
                <div className='flex justify-between mt-2'>
                   <p className='text-gray-500'>Don't have an account?</p>
                   <NavLink to="/signup" className="text-black-500">Sign Up</NavLink>
                </div>
                <button type='submit' className="bg-black hover:bg-gray-700 text-white font-bold py-3 px-4 rounded">
                  {loading ? <Loader2 className="animate-spin mx-auto w-5 h-5 " /> : "Login"}
                </button>
            </form>
        </div>
      
    </div>
  )
}

export default Login
