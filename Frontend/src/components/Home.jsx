import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa6";
import axios from "axios";
function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setConvert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        "http://localhost:3000/convertFile",
        formData,
        {
          responseType: "blob",
        }
      );
      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);
      const link = document.createElement("a");
      console.log(link);
      link.href = url;
      console.log(link);
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      console.log(link);
      document.body.appendChild(link);
      console.log(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setDownloadError("");
      setConvert("File Converted Successfully");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status == 400) {
        setDownloadError("Error occurred: ", error.response.data.message);
      } else {
        setConvert("");
      }
    }
  };
  return (
    <>
     <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40 shadow-lg h-16 fixed bg-gradient-to-r from-indigo-500 to-purple-500 text-white z-50">
  <div className="flex justify-between items-center">
    <h1 className="text-2xl cursor-pointer font-extrabold flex items-center space-x-2">
      <span className="text-3xl bg-blue-700 text-white p-2 rounded-full">PUREPDF</span>
      <span className="tracking-wide uppercase"></span>
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
<div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
  <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 relative">
    <div className="border-2 border-dashed px-6 py-8 md:px-12 md:py-10 border-indigo-400 rounded-2xl shadow-2xl bg-white relative">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-600">
        Convert Word to PDF Online
      </h1>
      <p className="text-base md:text-lg text-center mb-6 text-gray-600">
        "Quickly convert your Word documents to professional PDFs effortlessly, all online and hassle-free."
      </p>

      <div className="flex flex-col items-center space-y-6">
        <input
          type="file"
          accept=".doc,.docx"
          onChange={handleFileChange}
          className="hidden"
          id="FileInput"
        />
        <label
          htmlFor="FileInput"
          className="w-full flex items-center justify-center px-6 py-8 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg shadow-lg cursor-pointer border-2 border-blue-300 hover:bg-blue-600 hover:border-blue-700 hover:text-white duration-300"
        >
          <FaFileWord className="text-4xl text-blue-500 mr-4 group-hover:text-white" />
          <span className="text-lg md:text-xl font-medium">
            {selectedFile ? selectedFile.name : "Choose File"}
          </span>
        </label>
        <button
          onClick={handleSubmit}
          disabled={!selectedFile}
          className="text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-700 hover:to-indigo-800 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold text-lg px-6 py-3 rounded-lg shadow-lg"
        >
          Convert File
        </button>
        {convert && (
          <div className="text-green-600 text-center text-lg font-medium mt-4">
            {convert}
          </div>
        )}
        {downloadError && (
          <div className="text-red-600 text-center text-lg font-medium mt-4">
            {downloadError}
          </div>
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <h1 className="text-6xl font-extrabold text-yellow-1000">Tarun Varshney</h1>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default Home;
