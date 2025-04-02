
import { createSlice } from "@reduxjs/toolkit"




const JobsData = createSlice({
    name: 'Jobs',
    initialState:{
        jobs:[]
    },

    reducers:{

        SetJobs:(state,action)=>{
            state.jobs = action.payload
        }
    }
})



export const {SetJobs} = JobsData.actions
export default JobsData.reducer;