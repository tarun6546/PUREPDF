import React from "react";

function Navbar() {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40 shadow-lg h-16 fixed bg-gradient-to-r from-indigo-500 to-purple-500 text-white z-50">
  <div className="flex justify-between items-center">
    <h1 className="text-2xl cursor-pointer font-extrabold flex items-center space-x-2">
      <span className="text-3xl bg-blue-700 text-white p-2 rounded-full">LI</span>
      <span className="tracking-wide uppercase">PDF Converter</span>
    </h1>
    <div className="ml-auto flex space-x-6">
      <h1 className="text-2xl cursor-pointer font-bold hover:scale-110 hover:text-yellow-300 duration-300">
        Home
      </h1>
      <h1 className="text-xl cursor-pointer font-bold hover:scale-110 hover:text-yellow-300 duration-300">
        Contact Us
      </h1>
    </div>
  </div>
</div>

    </>
  );
}

export default Navbar;
