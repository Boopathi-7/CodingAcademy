import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { useUserContext } from "../components/UserContext"; // Import UserContext
import axios from "axios";

const Login = () => {
  const { setUser } = useUserContext(); // Accessing the context to set user details
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setIsLoading(true); // Set loading state

    try {
      // Fetching the list of registered users
      const response = await axios.get(
        "https://academy-project-swart.vercel.app/api/signup"
      );

      // Finding the matching user based on email and password
      const user = response.data.find(
        (user) => user.mail === email && user.password === password
      );

      if (user) {
        // Update context with logged-in user details
        setUser(user);

        // Store user details in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Navigate to the home page
        navigate("/");
        alert("Login successful!");
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Login</h1>
          {errorMessage && (
            <div className="alert alert-error shadow-lg mb-4">
              <span>{errorMessage}</span>
            </div>
          )}
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="form-control mb-4">
              <label htmlFor="email" className="label">
                <span className="label-text text-gray-700 font-medium">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
