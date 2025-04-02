import axios from 'axios';
import React from 'react'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';


const AddJobform = () => {
     const { register, handleSubmit,reset, formState:{ errors} } = useForm();
      const onSubmit = async (data) => {
             const formdata = {
                "title": data.title,
                "description": data.description,
                "location": data.location,
                "salary": data.salary,
                "company": data.company
             }
             try {
                const response = await axios.post("http://localhost:3000/api/recruiter/createjob",formdata,{withCredentials:true})
                if(response.data){
                    toast.success(response.data?.message || "Job posted successfully");
                    reset();
                }
                
             } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message || "Something went wrong");
             }
               
           
      }
  return (
    <div className="max-w-2xl mx-auto mt-2 p-3 border bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Post a Job</h2>

      <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-600">Job Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1 "
            placeholder="Enter job title" {...register("title", { required: true })}
          />
        </div>
        {errors.title && <div className="text-red-500">This field is required</div>}
        <div>
          <label className="block text-gray-600">Job Description</label>
          <textarea
            className="w-full p-2 border rounded mt-1 "
            placeholder="Enter job description" {...register("description", { required: true })}
          />
        </div>
        {errors.description && <div className="text-red-500">This field is required</div>}

        <div>
          <label className="block text-gray-600">Company Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g. ABC Company" {...register("company", { required: true })}
          />
        </div>
        {errors.company && <div className="text-red-500">This field is required</div>}
        <div>
          <label className="block text-gray-600">Salary</label>
          <input
            type="number"
            className="w-full p-2 border rounded mt-1"
            placeholder="25000" {...register("salary", { required: true })}
          />
        </div>
        {errors.salary && <div className="text-red-500">This field is required</div>}
        <div>
          <label className="block text-gray-600">Location</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1 "
            placeholder="e.g., Remote, New York" {...register("location", { required: true })}
          />
        </div>
        {errors.location && <div className="text-red-500">This field is required</div>}
        <button type='submit' className="w-full bg-blue-500 text-white p-3 rounded-lg transition-all">
          Post Job
        </button>
      </form>
    </div>
  )
}

export default AddJobform
