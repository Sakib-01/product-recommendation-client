import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import menuIcon from "../assets/menu_icon.png";
import crossIcon from "../assets/cross_icon.svg";
import logo from "../assets/img/logo.jpg";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // If already on the homepage, scroll to the target section
      scrollToSection(target);
    } else {
      // Navigate to the homepage and scroll to the target section
      navigate("/", { replace: true });
      setTimeout(() => scrollToSection(target), 100);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="w-11/12 mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <img className="w-12" src={logo} alt="Logo" />
          <Link to="/" className="text-2xl font-bold text-primary">
            ProRecco
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-primary transition ${
                isActive ? "text-primary" : "text-gray-700"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/queries"
            className={({ isActive }) =>
              `hover:text-primary transition ${
                isActive ? "text-primary" : "text-gray-700"
              }`
            }
          >
            Queries
          </NavLink>
          <Link
            to="/"
            onClick={(e) => handleLinkClick(e, "category")}
            className={({ isActive }) =>
              `hover:text-primary transition ${
                isActive ? "text-primary" : "text-gray-700"
              }`
            }
          >
            Category
          </Link>
          <Link
            to="/"
            onClick={(e) => handleLinkClick(e, "blogs")}
            className={({ isActive }) =>
              `hover:text-primary transition ${
                isActive ? "text-primary" : "text-gray-700"
              }`
            }
          >
            Blogs
          </Link>
          <Link
            to="/"
            onClick={(e) => handleLinkClick(e, "review")}
            className={({ isActive }) =>
              `hover:text-primary transition ${
                isActive ? "text-primary" : "text-gray-700"
              }`
            }
          >
            Review
          </Link>
          {user && (
            <>
              <NavLink
                to="/recommendationsForMe"
                className={({ isActive }) =>
                  `hover:text-primary transition ${
                    isActive ? "text-primary" : "text-gray-700"
                  }`
                }
              >
                Recommendations
              </NavLink>
              <NavLink
                to="/myQuery"
                className={({ isActive }) =>
                  `hover:text-primary transition ${
                    isActive ? "text-primary" : "text-gray-700"
                  }`
                }
              >
                My <br /> Query
              </NavLink>
              <NavLink
                to="/myRecomendation"
                className={({ isActive }) =>
                  `hover:text-primary transition ${
                    isActive ? "text-primary" : "text-gray-700"
                  }`
                }
              >
                My <br /> Recommendation
              </NavLink>
            </>
          )}
        </ul>

        {/* Authentication & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <div className="">
                <img
                  className="w-10 h-10  rounded-full"
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="User"
                  title={user?.displayName}
                />
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-error btn-sm text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-4">
              <Link to="/login" className="btn btn-outline btn-primary btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm text-white">
                Sign Up
              </Link>
            </div>
          )}
          <button
            onClick={() => setShowMobileMenu(true)}
            className="lg:hidden text-primary"
          >
            <img src={menuIcon} alt="Menu Icon" className="w-8" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ${
          showMobileMenu ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setShowMobileMenu(false)}>
            <img src={crossIcon} alt="Close Menu" className="w-6" />
          </button>
        </div>
        <ul className="flex flex-col items-center gap-6 mt-6 text-lg font-medium">
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
                Recommendations
              </NavLink>
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
                My Recommendation
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
    </nav>
  );
};

export default Navbar;
