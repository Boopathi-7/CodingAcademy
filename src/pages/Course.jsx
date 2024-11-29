import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useBuyContext } from "../components/BuyContext";

const Course = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [courses, setCourses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // Toggle for Add Course Form
  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "",
    instructor: "",
    duration: "",
    price: "",
    rating: "",
    image: "",
  });
  const [editingCourse, setEditingCourse] = useState(null); // Track the course being edited

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
        usernumber: user.number,
      };

      setBoughtCourses((prev) => [...prev, courseWithUserDetails]); // Update context state

      // Update localStorage with the new purchase
      const storedBoughtCourses =
        JSON.parse(localStorage.getItem("boughtCourses")) || [];
      localStorage.setItem(
        "boughtCourses",
        JSON.stringify([...storedBoughtCourses, courseWithUserDetails])
      );

      alert("Course purchased successfully!");
    } else {
      alert("Please log in or sign up to purchase this course.");
    }
  };

  const handleAddCourse = async () => {
    try {
      const response = await axios.post(
        "https://course-db-three.vercel.app/api/courses/",
        newCourse
      );

      if (response.data) {
        setCourses((prev) => [...prev, response.data]); // Add new course to the list
        alert("Course added successfully!");
        setNewCourse({
          title: "",
          category: "",
          instructor: "",
          duration: "",
          price: "",
          rating: "",
          image: "",
        });
        setShowAddForm(false); // Hide form after saving
      }
    } catch (err) {
      alert("An error occurred while adding the course. Please try again.");
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`https://course-db-three.vercel.app/api/courses/${id}`);
      setCourses((prev) => prev.filter((course) => course._id !== id)); // Remove the deleted course from state
      alert("Course deleted successfully!");
    } catch (err) {
      alert("An error occurred while deleting the course. Please try again.");
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const response = await axios.put(
        `https://course-db-three.vercel.app/api/courses/${editingCourse._id}`,
        editingCourse
      );

      if (response.data) {
        setCourses((prev) =>
          prev.map((course) =>
            course._id === editingCourse._id ? response.data : course
          )
        ); // Update the course list after edit
        alert("Course updated successfully!");
        setEditingCourse(null); // Close the edit form
      }
    } catch (err) {
      alert("An error occurred while updating the course. Please try again.");
    }
  };

  return (
    <>
      <section className="bg-gradient-to-b from-indigo-200 via-purple-100 to-blue-200 py-10 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-8">
          Featured Courses
        </h2>
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : errorMessage ? (
          <div className="text-center text-red-500">{errorMessage}</div>
        ) : (
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                className="card card-side bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <figure>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title  text-gray-200 text-lg sm:text-xl font-bold">
                    {course.title}
                  </h2>
                  <p className="text-gray-200">
                    {course.category} | Duration: {course.duration} months
                  </p>
                  <p className="text-gray-200">
                    <span className="font-bold">Instructor:</span> {course.instructor}
                  </p>
                  <p className="text-gray-200">
                    <span className="font-bold">Price:</span> {course.price}
                  </p>
                  <p className="text-gray-200">
                    <span className="font-bold">Rating:</span> {course.rating}
                  </p>
                  <div className="card-actions flex flex-col justify-end space-y-4"> {/* Stack buttons vertically */}
                    <button
                      onClick={() => handleBuy(course)}
                      className="btn btn-primary  py-1 px-4 text-sm"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => setEditingCourse(course)}
                      className="btn bg-yellow-600 text-white hover:bg-yellow-700  py-1 px-4 text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="btn bg-red-600 text-white hover:bg-red-700  py-1 px-4 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {editingCourse && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-700">
              Update Course
            </h3>
            <form className="space-y-4">
              {Object.keys(editingCourse).map((field) => (
                field !== "_id" && (
                  <div key={field}>
                    <label className="block font-semibold text-gray-600 mb-2 capitalize">
                      {field}
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={editingCourse[field]}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          [field]: e.target.value,
                        })
                      }
                    />
                  </div>
                )
              ))}
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="btn bg-green-600 text-white hover:bg-green-700  py-1 px-4 text-sm"
                  onClick={handleUpdateCourse}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            className="btn bg-blue-600 text-white hover:bg-blue-700  py-1 px-4 text-sm"
            onClick={() => setShowAddForm(true)}
          >
            Add Course
          </button>
        </div>

        {showAddForm && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-700">
              Add New Course
            </h3>
            <form className="space-y-4">
              {Object.keys(newCourse).map((field) => (
                <div key={field}>
                  <label className="block font-semibold text-gray-600 mb-2 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={newCourse[field]}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, [field]: e.target.value })
                    }
                  />
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="btn bg-green-600 text-white hover:bg-green-700  py-1 px-4 text-sm"
                  onClick={handleAddCourse}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </>
  );
};

export default Course;
