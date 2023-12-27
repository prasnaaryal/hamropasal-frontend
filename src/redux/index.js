import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice"
//stores value in datafield 
export const store=configureStore({
    reducer:{
        user:userSliceReducer
    },
})