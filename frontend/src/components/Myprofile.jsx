import React from 'react'
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
import { Label } from "@/components/ui/label"
import { useSelector } from 'react-redux'

const Myprofile = () => {
    const user = useSelector((state)=>state.user.user)
    // console.log("user",user)
  return (
    <Dialog>
    <DialogTrigger asChild>
  
      <p className="cursor-pointer">My Profile</p>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>My profile</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" type="text" value={user?.name} disabled className="col-span-3 bg-gray-300 text-black font-bold" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" type="email"  value={user?.email} disabled className="col-span-3 bg-gray-300 text-black font-bold" />
        </div>
        
        {
            user?.role === "jobseeker" ? <>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right">
              Skills
            </Label>
            <Input id="skills" type="text"  value={user?.skills || ""} disabled className="col-span-3 bg-gray-300 text-black font-bold"/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Input id="phone no" type="text"  value={user?.bio} disabled className="col-span-3 bg-gray-300 text-black font-bold" />
          </div>
            </>: <><div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Company
            </Label>
            <Input id="company" type="text"  value={user?.company} disabled className="col-span-3 bg-gray-300 text-black font-bold"/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone no" className="text-right">
              Phone no
            </Label>
            <Input id="phone no" type="text"  value={user?.phone} disabled className="col-span-3 bg-gray-300 text-black font-bold" />
          </div>
          </>
        }
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default Myprofile
