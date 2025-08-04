import React from "react";
import { FaFilePdf, FaHome, FaEnvelope, FaFileWord } from "react-icons/fa";

function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 shadow-2xl backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-xl shadow-lg transform hover:rotate-12 transition-transform duration-300">
                <FaFilePdf className="text-2xl text-red-500" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-white tracking-wide">
                  PURE<span className="text-yellow-300">PDF</span>
                </h1>
                <p className="text-xs text-purple-200 -mt-1">
                  Document Converter
                </p>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-300 group"
              >
                <FaHome className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Home</span>
              </a>
              <a
                href="#features"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-300 group"
              >
                <FaFileWord className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Features</span>
              </a>
              <a
                href="#contact"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-300 group"
              >
                <FaEnvelope className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Contact</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button className="text-white hover:text-yellow-300 focus:outline-none">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500"></div>
      </nav>
    </>
  );
}

export default Navbar;
