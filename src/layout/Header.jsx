import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa6";
import { useSearch } from "../context/SearchContext";
import { MdFavorite } from "react-icons/md";
import _ from "lodash";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { setSearchResults } = useSearch();

  // to show user icon and get data from userdata
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const handleLogout = () => {
    // to get data from redux
    dispatch(logoutRedux());
    localStorage.removeItem("accessToken");
    toast("logout successfully");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);
  const wishListNumber = useSelector((state) => state.product.wishList);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      query: searchQuery.trim(),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/product/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("Error fetching search results.");
    }
  };

  const refreshPage = () => {
    window.location.href = "/";
  };

  console.log({ userData });

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}

      <div className="flex items-center  h-full justify-between">
        <div>
          <Link onClick={refreshPage}>
            <img src={logo} className="w-36 h-6 cursor-pointer" alt="Logo" />
          </Link>
        </div>

        <div>
          <nav className="gap-4 md:gap-12 text-base md:text-lg hidden md:flex">
            <Link onClick={refreshPage}>Home</Link>
            <Link to={"#"}>Menu</Link>
            <Link to={"#"}>About</Link>
            <Link to={"#"}>Contact</Link>
          </nav>
        </div>

        <div className="flex justify-center items-center gap-10">
          <div className="relative w-60">
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              <input
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4 md:gap 7">
            <div className="text-2xl text-red-600 relative">
              <Link to={"wishlist"}>
                <MdFavorite />
                <div className="absolute -top-2 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                  {wishListNumber.length}
                </div>
              </Link>
            </div>

            <div className="text-2xl text-red-600 relative">
              <Link to={"cart"}>
                <BsCartFill />
                <div className="absolute -top-2 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                  {cartItemNumber.length}
                </div>
              </Link>
            </div>

            {userData && userData.isLoggedIn ? (
              <div className="text-slate-600 " onClick={handleShowMenu}>
                <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md border border-amber-500">
                  {/* for image */}
                  <img src={userData.image} className="h-full w-full" />
                </div>
                {showMenu && (
                  <div className="absolute right-2 bg-white shadow drop-shadow-md flex flex-col min-w-[120] text-center">
                    {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                      <Link
                        to={"manage/dashboard"}
                        className="whitespace-nowrap cursor-pointer p-2"
                      >
                        Dashboard
                      </Link>
                    )}
                      <Link
                        to={"manage/products"}
                        className="whitespace-nowrap cursor-pointer p-2"
                      >
                        Products
                      </Link>
                      <Link
                        to={"manage/orders"}
                        className="whitespace-nowrap cursor-pointer p-2"
                      >
                        Orders
                      </Link>
                      <Link
                        to={"manage/settings"}
                        className="whitespace-nowrap cursor-pointer p-2"
                      >
                        Settings
                      </Link>
                      <p
                        className="cursor-pointer text-white p-2 bg-red-500 "
                        onClick={handleLogout}
                      >
                        Logout ({userData.firstName})
                      </p>

                    <nav className="text-base md:text-lg flex flex-col md:hidden">
                      <Link to={""} className="px-2 py-1">
                        Home
                      </Link>
                      <Link
                        to={"menu/658d97fea4bba6f2d57142d9"}
                        className="px-2 py-1"
                      >
                        Menu
                      </Link>
                      <Link to={"about"} className="px-2 py-1">
                        About
                      </Link>
                      <Link to={"contact"} className="px-2 py-1">
                        Contact
                      </Link>
                    </nav>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaRegUser />
                <span>
                  <Link to={"login"} className="text-sm">
                    Login
                  </Link>{" "}
                  |{" "}
                  <Link to={"signup"} className="text-sm">
                    Signup
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
