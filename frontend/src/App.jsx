import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";  
import Home from "./pages/Home";
import SubmitTestimonial from "./pages/SubmitTestimonial";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import TestimonialsList from "./components/TestimonialsList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<SubmitTestimonial/>} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path="/testimonials" element={<TestimonialsList/>}/>
        </Routes>
      </main>
    </div>
  );
}
