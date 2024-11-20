import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useBuyContext } from "../components/BuyContext";

const Course = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [courses, setCourses] = useState([]);
  const { boughtCourses, setBoughtCourses } = useBuyContext();

  // Fetch courses from the API
  const fetchCourses = async () => {
    setIsLoading(true); // Set loading state
    setErrorMessage(""); // Reset error message
    try {
      const response = await axios.get(
        "https://course-db-three.vercel.app/api/courses/"
      );

      if (response.data) {
        setCourses(response.data); // Update state with fetched courses
      } else {
        setErrorMessage("No courses found."); // Handle case of empty data
      }
    } catch (err) {
      setErrorMessage("An error occurred while fetching courses. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    fetchCourses(); // Fetch courses on component mount
  }, []);

  const handleBuy = (course) => {
    // Retrieve the logged-in user details from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // Add the course details and user info to the boughtCourses state
      const courseWithUserDetails = {
        ...course,
        userId: user.id, // Add the user's unique ID
        userName: user.name,
        userMail: user.mail,
        usernumber: user.number
      };

      setBoughtCourses((prev) => [...prev, courseWithUserDetails]); // Update context state

      // Update localStorage with the new purchase
      const storedBoughtCourses = JSON.parse(localStorage.getItem("boughtCourses")) || [];
      localStorage.setItem(
        "boughtCourses",
        JSON.stringify([...storedBoughtCourses, courseWithUserDetails])
      );

      alert("Course purchased successfully!");
    } else {
      alert("Please log in or sign up to purchase this course.");
    }
  };

  return (
    <>
      <section className="bg-gray-100 py-10 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Featured Courses
        </h2>
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : errorMessage ? (
          <div className="text-center text-red-500">{errorMessage}</div>
        ) : (
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{course.category}</p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-bold">Instructor:</span> {course.instructor}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-bold">Duration:</span> {course.duration}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-bold">Price:</span> {course.price}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-bold">Rating:</span> {course.rating}
                </p>

                {/* Buy Button */}
                <div className="flex justify-between mt-4 space-x-2">
                  <button
                    onClick={() => handleBuy(course)} // Pass course to the buy handler
                    className="btn bg-purple-600 text-white"
                  >
                    Buy
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Course;
