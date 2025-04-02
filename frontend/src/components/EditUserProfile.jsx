
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
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { SetAuthUser } from '@/redux/UserSlice'

const EditUserProfile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user.user)
     const { register, handleSubmit,setValue,formState:{ errors} } = useForm()
      const onSubmit = async (data) => {
            
        console.log(data);
              try {
                 const response = await axios.post("http://localhost:3000/api/user/updateprofile",data,{withCredentials:true})
                 if(response.data){
                    console.log("update data",response.data);
                    toast.success(response.data?.message || "Profile updated successfully");
                    dispatch(SetAuthUser(response.data.updateduser))
                 }
                
                
              } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "Something went wrong");
              }
      }

      useEffect(()=>{
        if(user){
                setValue("name",user?.name|| ''),
                setValue("email",user?.email || '')
                setValue("skills",user?.skills || '')
                setValue("bio",user?.bio || '')
        }
      },[user,setValue])
  return (
    <Dialog>
    <DialogTrigger asChild>
    <p className="cursor-pointer" >Edit Profile</p>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]" disableAutoFocus onOpenAutoFocus={(e)=>e.preventdefault()}>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name"  autoFocus={false}  className="col-span-3" {...register("name", { required: true })} />
        </div>
        {errors.name && <span className="text-red-500">Name is required</span>}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            email
          </Label>
          <Input id="email"   className="col-span-3" {...register("email", { required: true })} />
        </div>
        {errors.email && <span className="text-red-500">Email is required</span>}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="skills" className="text-right">
            Skills
          </Label>
          <Input id="text"  className="col-span-3" {...register("skills", { required: true })} />
        </div>
        {errors.company && <span className="text-red-500">skills is required</span>}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="bio" className="text-right">
            bio
          </Label>
          <Input id="text"  className="col-span-3" {...register("bio", )} />
        </div>
        {errors.phone && <span className="text-red-500">Phone is required</span>}

      </div>

      <DialogFooter>
        <Button  type="submit">Save changes</Button>
      </DialogFooter>

      </form>
     
    </DialogContent>
  </Dialog>
  )
}

export default EditUserProfile
