import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    phone: "",
    message: "",
  });

  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      form.name === "" ||
      form.email === "" ||
      form.project === "" ||
      form.phone === "" ||
      form.message === ""
    ) {
      setFeedbackMessage("Please fill all the input fields 📩");
      return;
    }

    // Use the form element directly
    const formElement = document.getElementById("contact-form");

    // EmailJS send form
    emailjs
      .sendForm(
        "service_0st6jhr", // Replace with your service ID
        "template_7uin3vc", // Replace with your template ID
        formElement, // Use the form element
        "y_rnpfj5NJmVQOQRQ" // Replace with your public key
      )
      .then(() => {
        // Success: Show message and clear form
        setFeedbackMessage("Message sent ✅");
        setForm({
          name: "",
          email: "",
          project: "",
          phone: "",
          message: "",
        });

        // Clear the message after 5 seconds
        setTimeout(() => {
          setFeedbackMessage("");
        }, 1000);
      })
      .catch((error) => {
        // Failure: Show error message
        setFeedbackMessage("Oops! Something went wrong...");
        console.error("Error:", error);
      });
  };

  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg mt-2">
            Coding Academy trainers and sales representatives are here to help.
          </p>
        </motion.div>

        {/* Contact Information and Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Questions? A Project?
            </h3>
            <p className="text-gray-600 mb-4">
              Coding Academy trainers and sales representatives are available to
              answer your questions and help you make your training projects a
              reality.
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>
                <strong>Address 1:</strong> 5, Saibabacolony, Coimbatore
              </li>
              <li>
                <strong>Address 2:</strong> 59 rue des Petits Champs 75001 Paris
              </li>
              <li>
                <strong>Address 3:</strong> 2 place de Wagram 75017 Paris
              </li>
              <li>
                <strong>Phone:</strong> +91 8778135882
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:codingacademy@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  codingacademy@gmail.com
                </a>
              </li>
              <li>
                <strong>Hours:</strong> Monday - Friday 9.00 - 20.00
              </li>
            </ul>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Send Us a Message
            </h3>
            <form
              id="contact-form"
              className="space-y-4"
              onSubmit={sendEmail}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700">Project</span>
                </label>
                <input
                  type="text"
                  name="project"
                  value={form.project}
                  onChange={handleChange}
                  placeholder="Enter your project"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700">Phone</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700">Message</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message"
                  className="textarea textarea-bordered w-full"
                  rows="5"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary w-full"
                type="submit"
              >
                Send Message
              </motion.button>
            </form>
            {feedbackMessage && (
              <p className="text-center mt-4 text-gray-700">
                {feedbackMessage}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
