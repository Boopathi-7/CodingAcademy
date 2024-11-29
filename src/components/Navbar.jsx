import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUserContext } from "./UserContext";
import { useBuyContext } from "./BuyContext";
import { UserIcon } from "@heroicons/react/24/solid"; // Heroicons v2 uses the `/24/solid` or `/24/outline` path
import logo from "/src/assets/logo.jpg";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const [profileOpen, setProfileOpen] = useState(false); // Profile dropdown toggle
  const { user, setUser } = useUserContext(); // Access user context
  const { boughtCourses, setBoughtCourses } = useBuyContext();

  // Load bought courses from local storage on component mount
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("boughtCourses")) || [];
    setBoughtCourses(storedCourses);
  }, [setBoughtCourses]);

  // Function to handle logout
  const handleLogout = () => {
    setUser(null); // Clear logged-in user state
    alert("Logged out successfully!");
  };

  // Function to handle removing a course from the buy menu
  const handleRemoveFromBuyMenu = (courseId) => {
    const updatedCourses = boughtCourses.filter((course) => course._id !== courseId);
    setBoughtCourses(updatedCourses);
    localStorage.setItem("boughtCourses", JSON.stringify(updatedCourses)); // Save updated list to local storage
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-white font-bold text-2xl">Coding Academy</h1>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white font-medium">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/courses" className="hover:underline">
            Courses
          </Link>
          
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Profile/Actions */}
        <div className="relative flex items-center">
          {user ? (
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 text-white font-medium"
            >
              <UserIcon className="w-6 h-6 text-white" /> {/* User icon */}
              <span>{user.name}</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Sign In
            </Link>
          )}

          {/* Dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-12 bg-white shadow-xl rounded-lg w-64 text-gray-800"
              >
                <div className="p-4 flex items-center gap-4">
                  <div>
                    <p className="font-bold text-lg">{user?.name || "Guest"}</p>
                    <p className="text-sm text-gray-500">{user?.email || "Welcome"}</p>
                  </div>
                </div>
                <ul className="divide-y divide-gray-200">
                  {user ? (
                    <>
                      <li className="p-3 hover:bg-gray-100">
                        🛍️ Buy Menu ({boughtCourses.length})
                        <div className="mt-2">
                          {boughtCourses.length === 0 ? (
                            <p className="text-gray-500 p-2">
                              No items in your Buy Menu.
                            </p>
                          ) : (
                            boughtCourses.map((course) => (
                              <div
                                key={course._id}
                                className="p-2 border-b flex justify-between items-center"
                              >
                                <div>
                                  <h4 className="font-semibold">
                                    {course.title}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {course.price}
                                  </p>
                                </div>
                                <button
                                  onClick={() =>
                                    handleRemoveFromBuyMenu(course._id)
                                  }
                                  className="text-red-500 text-sm"
                                >
                                  Remove
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </li>
                      <li className="p-3 hover:bg-gray-100">
                        <button onClick={handleLogout}>🚪 Log Out</button>
                      </li>
                    </>
                  ) : (
                    <li className="p-3 hover:bg-gray-100">
                      <Link to="/signup">Sign Up</Link>
                    </li>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden flex flex-col bg-white p-4 shadow-lg rounded-lg"
          >
            <Link to="/" className="text-gray-800 py-2">
              Home
            </Link>
            <Link to="/courses" className="text-gray-800 py-2">
              Courses
            </Link>
            <Link to="/about" className="text-gray-800 py-2">
              About
            </Link>
            <Link to="/contact" className="text-gray-800 py-2">
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/buy" className="text-gray-800 py-2">
                  🛍️ Buy
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 py-2"
                >
                  🚪 Log Out
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-800 py-2">
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
