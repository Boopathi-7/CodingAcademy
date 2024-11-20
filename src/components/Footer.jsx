import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gray-900 text-gray-300 py-8"
    >
      <div className="container mx-auto px-4">
        {/* Grid Layout for Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1: About */}
          <div>
           
            <p className="text-sm ">
            Copyright © 2023 – Designed by Coding Academy  on Academist Elated Theme – Last updated: 11/2024</p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link   to="/" className="hover:text-white">Home</Link>
              </li>
              <li>
              <Link   to="/about" className="hover:text-white"> About Us</Link>

              </li>
              <li>
              <Link   to="/courses" className="hover:text-white">Coures</Link>
              </li>
              <li>
              <Link   to="/contact" className="hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>5, Saibabacolony,Coimbatore-641043</li>
              {/* <li>2 place de Wagram 75017 Paris</li> */}
              <li>
                <a href="tel:+33182522525" className="hover:text-white">
                  +91 87781358882
                </a>
              </li>
              <li>
                <a href="mailto:hello@mistra.fr" className="hover:text-white">
                 codingacademy@gmail.com
                </a>
              </li>
              <li>Monday - Friday 9:00 - 20:00</li>
            </ul>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-sm text-gray-500"
        >
          <p>
            © 2024 Coding Academy. All rights reserved. Powered by
            <span className="text-white font-semibold"> Coding Academy</span>.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
