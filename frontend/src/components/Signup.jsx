import React, { useState } from 'react'
import { NavLink } from 'react-router'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [loading,setloading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data)=>{
            try {
                setloading(true);
                const response = await axios.post("http://localhost:3000/api/user/signup",data,{withCredentials:true});

                if(response.data){
                    toast.success("User created successfully");
                    navigate('/login');
                }

                
            } catch (error) {
                console.log("error",error);
                toast.error(error?.response?.data?.message || "Something went wrong");
                setloading(false);
            }

    }
  return (
    <div className=' flex h-screen justify-center items-center'>
        <div className='border-2  shadow-md rounded-md w-full sm:max-w-[400px] p-4'>
            <h3>Create a new account <br />  
                 <span className="text-gray-500">Please sign up to your account</span>
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} action="" className='flex flex-col gap-2 w-full   mt-4'>
            <label className='text-black-500'>Name</label>
            <input type="text" placeholder="Enter your name" className="py-2 px-1 rounded-md border" {...register("name", { required: true })} />
            {errors.name && <div className="text-red-500">This field is required</div>}
                <label className='text-black-500'>Email</label>
                <input type="email" placeholder="Enter your email" className="py-2 px-1 rounded-md border" {...register("email", { required: true })}/>
                {errors.email && <div className="text-red-500">This field is required</div>}
                <label className='text-black-500'>Password</label>
                <input type="password" placeholder="Enter your password" className="py-2 px-1 rounded-md  border" {...register("password", { required: true })} />
                {errors.password && <div className="text-red-500">This field is required</div>}
                <label className='text-black-500 '>Select a role</label>
                <select className='role py-2 px-1 space-x-2 rounded-md border' {...register("role", { required: true })} >
                    <option value="jobseeker">Jobseeker</option>
                    <option value="recruiter">Recruiter</option>
                </select>
                {errors.role && <div className="text-red-500">This field is required</div>}

                <label className='text-black-500 '>Company Name</label>
                <input type="text" placeholder="Enter your company name" className="py-2 px-1 rounded-md  border" {...register("company")} />

                <div className='flex justify-between mt-2'>
                   <p className='text-gray-500'>Already have an account?</p>
                   <NavLink to="/login" className="text-black-500">Login</NavLink>
                </div>

                <button type='submit' className="bg-black mt-2 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded">{ loading ? <Loader2 className="animate-spin mx-auto w-5 h-5 text-center"  /> : "Sign Up"}</button>
            </form>
        </div>
      
    </div>
  )
}

export default Signup
