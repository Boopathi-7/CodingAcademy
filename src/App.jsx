import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Course from "./pages/Course";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./components/signup";
import { UserProvider, useUserContext } from "./components/UserContext";

// Protect routes for logged-in users only
const PrivateRoute = ({ component }) => {
  const { user } = useUserContext();
  return user ? component : <Navigate to="/login" />;
};

// Prevent logged-in users from accessing Login/Signup
const AuthRoute = ({ component }) => {
  const { user } = useUserContext();
  return !user ? component : <Navigate to="/" />;
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute component={<HomePage />} />} />
          <Route path="/courses" element={<PrivateRoute component={<Course />} />} />
          <Route path="/about" element={<PrivateRoute component={<About />} />} />
          <Route path="/contact" element={<PrivateRoute component={<Contact />} />} />
          <Route path="/login" element={<AuthRoute component={<Login />} />} />
          <Route path="/signup" element={<AuthRoute component={<Signup />} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
