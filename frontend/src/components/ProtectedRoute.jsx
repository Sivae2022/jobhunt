import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const ProtectedRoute = ({children}) => {
    const user = useSelector((state)=>state.user.user)
     
    if(!user){
        return <Navigate to="/" replace />
    }

    if(user.role !== "recruiter"){
        return <Navigate to="/" replace />
    }

  return  children
}

export default ProtectedRoute
