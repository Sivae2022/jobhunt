import { createSlice } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import sessionStorage from "redux-persist/lib/storage/session"



const UserAuth = createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
         SetAuthUser:(state,action)=>{
            state.user = action.payload
         }
    }

})

export const {SetAuthUser} = UserAuth.actions
const persistConfig = {
    key:"user", storage:sessionStorage
}

const persistedReducer = persistReducer(persistConfig, UserAuth.reducer)
export default persistedReducer;