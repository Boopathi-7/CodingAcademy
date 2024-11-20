import React from "react";
import { motion } from "framer-motion";
import codingImg from "/src/assets/coding.jpg";

const About = () => {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About Our Academy
          </h2>
          <p className="text-gray-600 text-lg">
            Specialized training center for software development operating since
            2011 in France, Belgium, Switzerland, and Luxembourg.
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-700 text-base mb-6 leading-relaxed">
              Coding Academy brings together a community of independent consultants who
              are experts in different areas of software development through
              their corporate or entrepreneurial experiences. Coding Academy provides
              generic or tailor-made training ranging from 1 to 60 days for a
              varied audience: junior and senior developers, software
              architects, technical and functional project managers.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Python Training:</strong> 28 courses
              </li>
              <li>
                <strong>Java Training:</strong> 15 courses
              </li>
              <li>
                <strong>.NET Training:</strong> 22 courses
              </li>
              <li>
                <strong>Web Training:</strong> 20 courses (PHP, JavaScript
                frameworks, Angular)
              </li>
              <li>
                <strong>Cloud Training:</strong> 5 courses (Azure, AWS, Google
                Cloud)
              </li>
            </ul>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={codingImg}
              alt="Training Image"
               className="rounded-lg shadow-md w-full max-w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center"
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-800">2011</h3>
            <p className="text-gray-600">Year of creation</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-800">98%</h3>
            <p className="text-gray-600">
              Customer satisfaction from thousands of customers trained
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-800">100%</h3>
            <p className="text-gray-600">
              Participants recommend Coding Academy training courses
            </p>
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-gray-50 p-8 rounded-lg shadow-md"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Simple and Transparent Operation
          </h3>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li>Choice of training</li>
            <li>
              Interview with a  Coding Academy trainer during the week and drafting of a
              tailor-made program if necessary
            </li>
            <li>
              Support for people with disabilities by a  Coding Academy representative
            </li>
            <li>Management of the administrative part by  Coding Academy</li>
            <li>Training starts within one month</li>
            <li>
              Verification of acquired skills throughout the training
            </li>
          </ol>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
