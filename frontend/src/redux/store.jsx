
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/lib/storage/session";
import UserReducer from "./UserSlice";
import Jobsdata from "./JobSlice"



const userPersistConfig={
    key:"user",
    storage:sessionStorage,
}




const persisteduserreducer = persistReducer(userPersistConfig,UserReducer)

const rootReducer = combineReducers({
    user: persisteduserreducer,
    Jobs:Jobsdata
})



export const store = configureStore({
    reducer:rootReducer,
    middleware:(getdefaultMiddleware)=>getdefaultMiddleware({
        serializableCheck: false
    })
})
export const persistor = persistStore(store)
