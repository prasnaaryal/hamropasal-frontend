import React from "react";
import { FaOpencart } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="font-semibold text-2xl">Welcome back !!</h1>
      <div className="grid grid-cols-12 gap-3 w-full">
        <div className="col-span-6  shadow-md border border-gray-300 rounded-lg w-full p-6 flex items-center bg-white">
          <div className="grid grid-cols-12 gap-2 w-full px-10">
            <div className="col-span-3">
              <FaOpencart className="w-20 h-20 " />
            </div>
            <div className="col-span-9 flex flex-col gap-2 items-center justify-center w-full">
              <h2 className="font-semibold text-2xl">All Products</h2>
              <p className="font-semibold text-xl text-gray-400">123</p>
            </div>
          </div>
        </div>

        <div className="col-span-6  shadow-md border border-gray-300 rounded-lg w-full p-6 flex items-center bg-white">
          <div className="grid grid-cols-12 gap-2 w-full px-10">
            <div className="col-span-3">
              <MdOutlineCategory className="w-20 h-20 " />
            </div>
            <div className="col-span-9 flex flex-col gap-2 items-center justify-center w-full">
              <h2 className="font-semibold text-2xl">All Categories</h2>
              <p className="font-semibold text-xl text-gray-400">123</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 shadow-md  border border-gray-300 rounded-lg w-full p-20 flex items-center bg-white">
          <img
            className="rounded-lg w-full h-[650px] object-cover"
            src="https://www.thebritishacademy.ac.uk/media/images/Infographics_Update_.width-1000.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
