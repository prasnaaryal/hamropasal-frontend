import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import loginimage from "../assets/loginimage.gif";
import authimg from "../assets/authimg.png";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleUploadProfileImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    setData((prev) => ({
      ...prev,
      image: data,
    }));
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.length > 7) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;

    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/auth/register`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const dataRes = await fetchData.json();
        toast(dataRes.message);
        if (dataRes.alert) {
          navigate("/login");
        }
      } else {
        toast.error("Passwords do not match");
      }
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const renderPasswordStrengthBar = () => {
    if (!data.password) return null;

    const strengthLevels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColors = [
      "#ff4d4f",
      "#ff7a45",
      "#ffec3d",
      "#bae637",
      "#73d13d",
    ];

    return (
      <div className="mt-2">
        <div className="flex items-center">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(passwordStrength / 5) * 100}%`,
              backgroundColor:
                strengthColors[passwordStrength - 1] || "#ff4d4f",
            }}
          />
        </div>
        <p
          className="text-xs mt-1"
          style={{ color: strengthColors[passwordStrength - 1] || "#ff4d4f" }}
        >
          {strengthLevels[passwordStrength - 1] || "Very Weak"}
        </p>
      </div>
    );
  };

  return (
    <div className="p-3 md:p-4 grid grid-cols-12 gap-6 bg-white">
      <div className="col-span-6 w-full flex justify-center items-center">
        <img src={authimg} className="w-[600px]" alt="auth img" />
      </div>
      <div className="w-full max-w-md m-auto flex border flex-col col-span-6 p-6 rounded-lg">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img
            src={data.image ? data.image : loginimage}
            className="w-full h-full"
            alt="Profile"
          />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-20 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/jpeg, image/png"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type={"text"}
              id="firstName"
              name="firstName"
              className="mt-1 mb-2 w-full border px-2 py-2 rounded focus-within:outline-blue-300"
              value={data.firstName}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type={"text"}
              id="lastName"
              name="lastName"
              className="mt-1 mb-2 w-full border px-2 py-2 rounded focus-within:outline-blue-300"
              value={data.lastName}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type={"email"}
              id="email"
              name="email"
              className="mt-1 mb-2 w-full border px-2 py-2 rounded focus-within:outline-blue-300"
              value={data.email}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div className="flex px-2 py-2 border rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full outline-none"
                value={data.password}
                onChange={handleOnChange}
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
            {renderPasswordStrengthBar()}
          </div>

          <div>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <div className="flex px-2 py-2 border rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmpassword"
                name="confirmPassword"
                className="w-full outline-none"
                value={data.confirmPassword}
                onChange={handleOnChange}
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowConfirmPassword}
              >
                {showConfirmPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
          </div>

          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign up
          </button>
        </form>
        <div className="w-full flex justify-center">
          <p className="text-left text-sm mt-2">
            Already have an account?{" "}
            <Link to={"/login"} className="text-red-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
