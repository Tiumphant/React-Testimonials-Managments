import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
export default function Navbar({ isAdminLoggedIn }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight hover:text-gray-200 transition duration-300"
          >
            TestimonialApp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="hover:text-gray-200 transition duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/submit"
              className="hover:text-gray-200 transition duration-300 font-medium"
            >
              Submit
            </Link>
            {!isAdminLoggedIn ? (
              <Link
                to="/adminlogin"
                className="hover:text-gray-200 transition duration-300 font-medium bg-white/20 px-3 py-1 rounded-md hover:bg-white/30"
              >
                Admin Login
              </Link>
            ) : (
              <Link
                to="/admin"
                className="hover:text-gray-200 transition duration-300 font-semibold bg-white/20 px-3 py-1 rounded-md hover:bg-white/30"
              >
                Admin Panel
              </Link>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-white text-3xl focus:outline-none hover:text-gray-200 transition duration-300"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-blue-700 px-4 py-4 space-y-2 rounded-b-lg shadow-lg"
          >
            <Link
              to="/"
              className="block hover:text-gray-200 font-medium transition duration-300"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/submit"
              className="block hover:text-gray-200 font-medium transition duration-300"
              onClick={() => setOpen(false)}
            >
              Submit
            </Link>
            {!isAdminLoggedIn ? (
              <Link
                to="/admin-login"
                className="block hover:text-gray-200 font-medium transition duration-300 bg-white/20 px-3 py-1 rounded-md hover:bg-white/30"
                onClick={() => setOpen(false)}
              >
                Admin Login
              </Link>
            ) : (
              <Link
                to="/admin"
                className="block hover:text-gray-200 font-semibold transition duration-300 bg-white/20 px-3 py-1 rounded-md hover:bg-white/30"
                onClick={() => setOpen(false)}
              >
                Admin Panel
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
