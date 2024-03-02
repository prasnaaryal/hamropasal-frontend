import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./page/Home";
import Menu from "./page/Menu";
import Newproduct from "./page/manage/NewProduct";
import EditProduct from "./page/manage/EditProduct";
import Login from "./page/Login";
import Signup from "./page/Signup";
import { Provider } from "react-redux";
import { store } from "./redux";
import Cart from "./page/Cart";
import Dashboard from "./page/manage/Dashboard";
import ProductList from "./page/manage/ProductList";
import OrderList from "./page/manage/OrderList";
import Settings from "./page/manage/Settings";
import WishList from "./page/WishList";
import AuthProvider from "./component/AuthProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      {/* <Route path="menu" element={<Menu />} /> */}
      <Route path="menu/:filterby" element={<Menu />} />
      <Route path="login" element={<Login />} />
      <Route path="manage/newproduct" element={<Newproduct />} />
      <Route path="manage/editproduct/:id" element={<EditProduct />} />
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />{" "}
      <Route path="wishlist" element={<WishList />} />
      <Route path="manage/dashboard" element={<Dashboard />} />
      <Route path="manage/products" element={<ProductList />} />
      <Route path="manage/orders" element={<OrderList />} />
      <Route path="manage/settings" element={<Settings />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
