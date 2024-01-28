import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import loginimage from "../assets/loginimage.gif";
import authimg from "../assets/authimg.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  //to store value
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const userData = useSelector((state) => state);
  console.log(userData.user);

  const dispatch = useDispatch();

  // console.log(data);

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    //if not empty
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const dataRes = await fetchData.json();
      console.log({ dataRes });
      toast(dataRes.message);

      if (dataRes.alert) {
        // If login successful, check if the email is admin email
        if (dataRes.data.email === process.env.REACT_APP_ADMIN_EMAIL) {
          // If it's the admin email, navigate to /manage/dashboard
          dispatch(loginRedux(dataRes));
          setTimeout(() => {
            navigate("/manage/dashboard");
          }, 1000);
        } else {
          // If it's not the admin email, send the data to dispatch and navigate accordingly
          dispatch(loginRedux(dataRes));
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } else {
        alert("Pls enter required fields");
      }
    }
  };

  console.log(userData);
  return (
    <div className=" bg-white grid grid-cols-12 gap-6 py-10 px-3 md:px-4 ">
      {/* image */}
      <div className="col-span-6 w-full flex justify-center items-center">
        <img src={authimg} className="w-[600px]" alt="authimg" />
      </div>

      <div className="w-full max-w-sm  m-auto flex border rounded-lg flex-col col-span-6 p-6">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginimage} className="w-full" />
        </div>

        {/* //text form  */}

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type={"email"}
              id="email"
              name="email"
              className="mt-1 mb-2 w-full px-2 py-2 rounded focus-within:outline-blue-300 border"
              value={data.email}
              onChange={handleOnchange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="flex px-2 py-2 rounded mt-1 mb-2  border focus-within:outline-blue-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full outline-none"
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
          </div>

          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>

        <div className="flex justify-center">
          <p className="text-left text-sm my-2">
            Dont have an account?{" "}
            <Link to={"/signup"} className="text-red-500 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
