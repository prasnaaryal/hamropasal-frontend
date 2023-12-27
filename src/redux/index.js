import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice"
import productSlideReducer from "./productSlide"
//stores value in datafield 
export const store=configureStore({
    reducer:{
        user:userSliceReducer,
        product:productSlideReducer

    },
})