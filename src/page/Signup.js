import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import loginimage from "../assets/loginimage.gif";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setShowConfirmpassword] = useState(false);
  //to store value
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  console.log(data);

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmpassword((preve) => !preve);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    //if not empty
    if (firstName && email && password && confirmPassword) {
      //check if password and confirm password are same
      if (password === confirmPassword) {
        alert("sucess");
      } else {
        alert("password not equal");
      }
    } else {
      alert("Pls enter required fields");
    }
  };

  return (
    <div className="p-3 md:pd-4 ">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginimage} className="w-full" />
        </div>

        {/* //text form  */}
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.firstName} //name and value name must be similar
            onChange={handleOnchange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnchange}
          />

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnchange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 px-2 py-1 rounded mt-1 mb-2  focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnchange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword"> Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 px-2 py-1 rounded mt-1 mb-2  focus-within:outline-blue-300">
            <input
              type={confirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnchange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {confirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign up
          </button>
        </form>

        <p className="text-left text-sm my-2">
          Already have an account?
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
