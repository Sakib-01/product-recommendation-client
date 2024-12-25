import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import menuIcon from "../assets/menu_icon.png";
import crossIcon from "../assets/cross_icon.svg";
import logo from "../assets/img/logo.jpg";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out!");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full z-20 bg-base-100 shadow-lg">
      <div className="lg:w-11/12 mx-auto flex justify-between items-center py-4  ">
        <div className="flex gap-2">
          {/* Logo */}
          <img className="w-14" src={logo} alt="" />
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-primary font-bold text-3xl ">ProRecco</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-neutral font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `cursor-pointer hover:text-primary ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/queries"
            className={({ isActive }) =>
              `cursor-pointer hover:text-primary ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            Queries
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/recommendationsForMe"
                className={({ isActive }) =>
                  `cursor-pointer hover:text-primary ${
                    isActive ? "text-primary" : ""
                  }`
                }
              >
                Recommendations For Me
              </NavLink>
              {/* <NavLink
                to="/addQuery"
                className={({ isActive }) =>
                  `cursor-pointer hover:text-primary ${
                    isActive ? "text-primary" : ""
                  }`
                }
              >
                Add Query
              </NavLink> */}
              <NavLink
                to="/myQuery"
                className={({ isActive }) =>
                  `cursor-pointer hover:text-primary ${
                    isActive ? "text-primary" : ""
                  }`
                }
              >
                My Query
              </NavLink>
              <NavLink
                to="/myRecomendation"
                className={({ isActive }) =>
                  `cursor-pointer hover:text-primary ${
                    isActive ? "text-primary" : ""
                  }`
                }
              >
                My Recomendation
              </NavLink>
            </>
          )}
        </ul>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {/* User Profile */}
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="User"
                  />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-error text-white btn-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-primary btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setShowMobileMenu(true)}
          className="md:hidden text-primary"
        >
          <img src={menuIcon} alt="Menu Icon" className="w-8" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-base-200 z-30 transform transition-transform duration-300 ${
          showMobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button
            onClick={() => setShowMobileMenu(false)}
            className="text-red-500"
          >
            <img src={crossIcon} alt="Close Icon" className="w-6" />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col items-center gap-6 mt-10 text-lg font-medium">
          <NavLink
            to="/"
            onClick={() => setShowMobileMenu(false)}
            className="btn btn-primary btn-block"
          >
            Home
          </NavLink>
          <NavLink
            to="/queries"
            onClick={() => setShowMobileMenu(false)}
            className="btn btn-primary btn-block"
          >
            Queries
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/recommendationsForMe"
                onClick={() => setShowMobileMenu(false)}
                className="btn btn-primary btn-block"
              >
                Recommendations for me
              </NavLink>
              {/* <NavLink
                to="/addQuery"
                onClick={() => setShowMobileMenu(false)}
                className="btn btn-primary btn-block"
              >
                Add Query
              </NavLink> */}
              <NavLink
                to="/myQuery"
                onClick={() => setShowMobileMenu(false)}
                className="btn btn-primary btn-block"
              >
                My Query
              </NavLink>
              <NavLink
                to="/myRecomendation"
                onClick={() => setShowMobileMenu(false)}
                className="btn btn-primary btn-block"
              >
                My Recomendation
              </NavLink>
            </>
          )}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setShowMobileMenu(false);
              }}
              className="btn btn-error btn-block"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setShowMobileMenu(false)}
              className="btn btn-primary btn-block"
            >
              Login
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
