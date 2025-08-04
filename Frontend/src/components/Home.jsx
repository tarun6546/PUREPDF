import React, { useState } from "react";
import {
  FaFileWord,
  FaFilePdf,
  FaCloudUploadAlt,
  FaDownload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import axios from "axios";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setConvert("");
    setDownloadError("");
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (
        file.type.includes("word") ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx")
      ) {
        setSelectedFile(file);
        setConvert("");
        setDownloadError("");
      } else {
        setDownloadError("Please select a Word document (.doc or .docx)");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setDownloadError("Please select a file first");
      return;
    }

    setIsLoading(true);
    setConvert("");
    setDownloadError("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/convertFile",
        formData,
        {
          responseType: "blob",
          timeout: 30000, // 30 second timeout
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSelectedFile(null);
      setDownloadError("");
      setConvert("File converted and downloaded successfully! 🎉");
    } catch (error) {
      console.error("Conversion error:", error);
      if (error.response && error.response.status === 400) {
        setDownloadError(
          "Error occurred: " + (error.response.data.message || "Invalid file")
        );
      } else if (error.code === "ECONNABORTED") {
        setDownloadError("Conversion timeout. Please try with a smaller file.");
      } else {
        setDownloadError(
          "Conversion failed. Please check if the backend server is running."
        );
      }
      setConvert("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pt-20">
        {/* Main Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Convert Word to PDF
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transform your Word documents into professional PDFs instantly.
              Fast, secure, and completely free - no registration required!
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ✨ High Quality
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                🚀 Lightning Fast
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                🔒 100% Secure
              </span>
              <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                📱 Works Everywhere
              </span>
            </div>
          </div>

          {/* Main Conversion Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-purple-500 to-blue-600 px-8 py-6">
                <div className="flex items-center justify-center space-x-4">
                  <FaFileWord className="text-3xl text-white" />
                  <FaFilePdf className="text-3xl text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white text-center mt-3">
                  Word to PDF Converter
                </h2>
              </div>

              {/* Card Body */}
              <div className="p-8">
                {/* File Upload Area */}
                <div
                  className={`relative border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : selectedFile
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="FileInput"
                    disabled={isLoading}
                  />

                  {selectedFile ? (
                    <div className="space-y-4">
                      <FaCheckCircle className="text-5xl text-green-500 mx-auto" />
                      <div>
                        <p className="text-lg font-semibold text-green-700">
                          File Selected!
                        </p>
                        <p className="text-gray-600 mt-1">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Size: {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                          MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <FaCloudUploadAlt className="text-5xl text-gray-400 mx-auto" />
                      <div>
                        <p className="text-lg font-semibold text-gray-700">
                          Drop your Word file here
                        </p>
                        <p className="text-gray-500 mt-1">
                          or click to browse files
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Supports .doc and .docx files up to 50MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Convert Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!selectedFile || isLoading}
                  className={`w-full mt-6 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    !selectedFile || isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <FaSpinner className="animate-spin text-xl" />
                      <span>Converting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <FaDownload />
                      <span>Convert to PDF</span>
                    </div>
                  )}
                </button>

                {/* Status Messages */}
                {convert && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <FaCheckCircle className="text-green-500 text-xl" />
                      <p className="text-green-700 font-medium">{convert}</p>
                    </div>
                  </div>
                )}

                {downloadError && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <FaExclamationTriangle className="text-red-500 text-xl" />
                      <p className="text-red-700 font-medium">
                        {downloadError}
                      </p>
                    </div>
                  </div>
                )}

                {/* Progress Indicator */}
                {isLoading && (
                  <div className="mt-6">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-600 h-full rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-center text-gray-600 mt-2 text-sm">
                      Please wait while we convert your document...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFileWord className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Multiple Formats
              </h3>
              <p className="text-gray-600">
                Supports .doc and .docx files with perfect formatting
                preservation.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaDownload className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Instant Download
              </h3>
              <p className="text-gray-600">
                Get your converted PDF file immediately after processing.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                High Quality
              </h3>
              <p className="text-gray-600">
                Maintains original document quality and formatting perfectly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
