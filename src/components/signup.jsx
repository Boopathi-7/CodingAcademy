import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserContext } from "../components/UserContext"; // Importing the context to set user data
import axios from "axios";

const Signup = () => {
  const { setUser } = useUserContext(); // Accessing the context to set user data
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    mail: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateInputs = () => {
    const { name, number, mail, password } = formData;

    // Validate Name
    if (name.trim().length < 3) {
      setErrorMessage("Name must be at least 3 characters long.");
      return false;
    }

    // Validate Phone Number
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(number)) {
      setErrorMessage("Enter a valid 10-digit phone number starting with 6-9.");
      return false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      setErrorMessage("Enter a valid email address.");
      return false;
    }

    // Validate Password
    if (password.trim().length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }

    // Clear any previous errors
    setErrorMessage("");
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setIsLoading(true); // Set loading state

    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }

    try {
      // Make a POST request to register a new user
      const response = await axios.post(
        "https://academy-project-swart.vercel.app/api/signup",
        formData
      );
      console.log("Signup successful:", response.data);

      // Set the user data in context after successful signup
      setUser(response.data); // Store the new user data in context

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Navigate to the home page on success
      alert("Signup successful! Please log in.");
      navigate("/"); // Redirect to the home page
    } catch (err) {
      setErrorMessage(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm mx-auto p-4"
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Sign Up</h2>
          {errorMessage && (
            <div className="alert alert-error shadow-lg mb-4">
              <span>{errorMessage}</span>
            </div>
          )}
          <form onSubmit={handleSignup}>
            {/* Name Field */}
            <div className="form-control mb-4">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-700 font-medium">Name</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* Number Field */}
            <div className="form-control mb-4">
              <label htmlFor="number" className="label">
                <span className="label-text text-gray-700 font-medium">Number</span>
              </label>
              <input
                type="number"
                id="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* Email Field */}
            <div className="form-control mb-4">
              <label htmlFor="mail" className="label">
                <span className="label-text text-gray-700 font-medium">Email</span>
              </label>
              <input
                type="email"
                id="mail"
                value={formData.mail}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* Password Field */}
            <div className="form-control mb-4">
              <label htmlFor="password" className="label">
                <span className="label-text text-gray-700 font-medium">Password</span>
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* Signup Button */}
            <button
              type="submit"
              className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              Sign Up
            </button>
          </form>
          {/* Redirect to Login */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
