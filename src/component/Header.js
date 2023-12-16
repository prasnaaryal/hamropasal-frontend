import React from "react";
import logo2 from "../assets/logo2.png";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";

const Header = () => {
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-16">
            <img src={logo2} className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap 7">
          <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
            <Link to={""}>Home</Link>
            <Link to={""}>Menu</Link>
            <Link to={""}>About</Link>
            <Link to={""}>Contact</Link>
          </nav>
          <div className="text-2xl text-red-600 relative">
            <BsCartFill />
            <div className="absolute -top-2 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
              0
            </div>
          </div>
          <div className="text-2xl text-red-600 ">
            <FaUserAlt />
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
