import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSliceReducer from "./productSlice";
import categorySliceReducer from "./categorySlice";
//stores value in datafield
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    product: productSliceReducer,
    category: categorySliceReducer,
  },
});
