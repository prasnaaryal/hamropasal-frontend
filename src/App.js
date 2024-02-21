// src/App.js
import React, { useEffect } from "react";
import "./App.css";
import Header from "./layout/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./layout/Footer";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice"; // Adjust import path as necessary
import { setDataProduct } from "./redux/productSlice";
import { setDataCategory } from "./redux/categorySlice";
import { SearchProvider } from "./context/SearchContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch products
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/product/getallproducts`
      );
      const resData = await res.json();
      dispatch(setDataProduct(resData));
    })();
  }, [dispatch]);

  useEffect(() => {
    // Fetch categories
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/category`
      );
      const resData = await res.json();
      dispatch(setDataCategory(resData));
    })();
  }, [dispatch]);

  useEffect(() => {
    // Fetch and set user data
    (async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_DOMAIN}/user/load-user`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.ok) {
            const userData = await response.json();
            dispatch(setUserData(userData)); // Dispatch the user data
          } else {
            console.error("Failed to load user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    })();
  }, [dispatch]);

  return (
    <>
      <SearchProvider>
        <Toaster />
        <Header />
        <main className="pt-16 bg-slate-100">
          <Outlet />
        </main>
        <Footer />
      </SearchProvider>
    </>
  );
}

export default App;
