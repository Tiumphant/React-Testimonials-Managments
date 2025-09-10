import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ isAdminLoggedIn }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold tracking-tight hover:text-gray-200 transition">
            Testimonials
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover:text-gray-200 transition duration-200">Home</Link>
            <Link to="/submit" className="hover:text-gray-200 transition duration-200">Submit</Link>
            {!isAdminLoggedIn ? (
              <Link to="/adminlogin" className="hover:text-gray-200 transition duration-200">Admin Login</Link>
            ) : (
              <Link to="/admin" className="hover:text-gray-200 transition duration-200 font-semibold">Admin Panel</Link>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-blue-700 px-4 py-3 space-y-2 animate-slideDown">
          <Link to="/" className="block hover:text-gray-200 transition" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/submit" className="block hover:text-gray-200 transition" onClick={() => setOpen(false)}>Submit</Link>
          {!isAdminLoggedIn ? (
            <Link to="/admin-login" className="block hover:text-gray-200 transition" onClick={() => setOpen(false)}>Admin Login</Link>
          ) : (
            <Link to="/admin" className="block hover:text-gray-200 font-semibold transition" onClick={() => setOpen(false)}>Admin Panel</Link>
          )}
        </div>
      )}
    </nav>
  );
}
