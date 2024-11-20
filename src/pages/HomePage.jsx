import React from "react";
import { motion } from "framer-motion";
import aboo from "/src/assets/aboo.jpg";
import janani from "/src/assets/janani.jpg";
import logesh from "/src/assets/logesh.jpg";
import ramyaImg from "/src/assets/ramyaImg.jpg";
import saran from "/src/assets/saran.jpg";
import prathosh from "/src/assets/prathosh.jpg";
import { Link } from "react-router-dom";

const HomePage = ({ loggedInUser }) => {
  const courses = [
    {
      category: "Web",
      title: "React JS",
      instructor: "Gaetan",
      duration: "1 month",
      price: "2500",
      rating: "0 Ratings",
    },
    {
      category: "Web",
      title: "Angular JS",
      instructor: "Alexander",
      duration: "25 Days",
      price: "1800",
      rating: "0 Ratings",
    },
    {
      category: "Full Stack",
      title: "MERN Stack",
      instructor: "Arun",
      duration: "4 months",
      price: "8000",
      rating: "0 Ratings",
    },
    {
      category: "PHP",
      title: "Developing with the Laravel Framework",
      instructor: "Thomas",
      duration: "1 month",
      price: "1650",
      rating: "0 Ratings",
    },
    {
      category: "Full Stack",
      title: "Java Full Stack",
      instructor: "Aboobakar",
      duration: "4 months",
      price: "8000",
      rating: "0 Ratings",
    },
    {
      category: "Web",
      title: "Advanced NodeJS Training",
      instructor:
        "Master the mechanisms needed to create robust professional web applications using Node.js",
      duration: "15 days",
      price: "750",
      rating: "0 Ratings",
    },
    {
      category: "Web",
      title: "Advanced JavaScript Training",
      instructor: "Maideen",
      duration: "15 days",
      price: "800",
      rating: "0 Ratings",
    },
    {
      category: "Web",
      title: "Next JS",
      instructor: "Ramya",
      duration: "1 month",
      price: "1500",
      rating: "0 Ratings",
    },
  ];

  const trainers = [
    { name: "Ramya", role: "Technical Director", img: ramyaImg },
    { name: "Aboobakar", role: "DevOps and System Administration Engineer", img: aboo },
    { name: "Logesh", role: "Web Developer and Database Trainer", img: logesh },
    { name: "Janani", role: "Open Source and CMS Web Developer and Trainer", img: janani },
    { name: "Prathosh", role: "Lead .NET Developer and Project Management Trainer", img: prathosh },
    { name: "Saran", role: "Java Developer and Trainer", img: saran },
  ];

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Welcome Section */}
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold">Welcome to Coding Academy</h1>
        <p className="text-xl mt-4">Learn coding with ease!</p>
      </motion.div>
     
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hero bg-gray-800 text-white py-20 px-6"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Learn New Technologies Efficiently
          </h1>
          <p className="mb-6 text-lg">
            Explore our expert-led training courses to boost your career in software development.
          </p>
          <button className="btn btn-primary btn-wide"> <Link to="/about">Learn More</Link></button>
        </div>
      </motion.div>

      {/* Courses Section */}
      <div className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="card bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <h3 className="font-bold text-xl">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.category}</p>
                <p className="mt-2">
                  <span className="font-semibold">Instructor:</span> {course.instructor}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span> {course.duration}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> {course.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trainers Section */}
      <div className="bg-gray-200 py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">Meet Our Trainers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="card bg-white shadow-md border border-gray-300 rounded-lg p-4"
            >
              <img
                src={trainer.img}
                alt={`${trainer.name}'s profile`}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-xl mb-2">{trainer.name}</h3>
              <p className="text-sm text-gray-600">{trainer.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Simple CTA Section */}
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        className="bg-gray-800 text-white py-12 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Improve Yourself</h2>
        <p className="mb-6">
          Join thousands of professionals who have advanced their skills with our expert trainers.
        </p>
        <button className="btn btn-primary btn-wide"><Link to="/courses">Join Now</Link></button>
      </motion.div>
    </div>
  );
};

export default HomePage;
