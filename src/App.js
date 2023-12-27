import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataProduct } from "./redux/productSlide";

function App() {

  const dispatch=useDispatch()

  const productData=useSelector((state)=>state.product)

  useEffect(()=>{
    (async()=>{
      const res=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
      const resData=await res.json()
      console.log(resData)
      dispatch(setDataProduct(resData))
  
  })()},[])
  console.log(productData)

  return (
    <>
    <Toaster/>
    <div>
      <Header />
      <main className="pt-16 bg-slate-100">
        <Outlet />
      </main>
    </div>
    </>
  );
}

export default App;
