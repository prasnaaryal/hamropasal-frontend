import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSliceReducer from "./productSlice";
import categorySliceReducer from "./categorySlice";
import orderSliceReducer from "./orderSlice";
//stores value in datafield
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    product: productSliceReducer,
    category: categorySliceReducer,
    order: orderSliceReducer,
  },
});
