"use client";

import { useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaCar,
  FaCreditCard,
  FaUserShield,
} from "react-icons/fa";

export default function Verification() {
  const [verificationItems, setVerificationItems] = useState([
    {
      id: "1",
      title: "ID Verification",
      description: "Verify your identity with a government-issued ID",
      status: "completed",
      icon: <FaIdCard className="text-blue-500" />,
      required: true,
      lastUpdated: "2024-03-15",
      verificationType: "id",
    },
    {
      id: "2",
      title: "Phone Verification",
      description: "Verify your phone number",
      status: "completed",
      icon: <FaPhone className="text-green-500" />,
      required: true,
      lastUpdated: "2024-03-15",
      verificationType: "phone",
    },
    {
      id: "3",
      title: "Email Verification",
      description: "Verify your email address",
      status: "completed",
      icon: <FaEnvelope className="text-purple-500" />,
      required: true,
      lastUpdated: "2024-03-15",
      verificationType: "email",
    },
    {
      id: "4",
      title: "Payment Method",
      description: "Add and verify a payment method",
      status: "completed",
      icon: <FaCreditCard className="text-yellow-500" />,
      required: true,
      lastUpdated: "2024-03-15",
      verificationType: "payment",
    },
    {
      id: "5",
      title: "Car Documentation",
      description: "Upload car registration and insurance documents",
      status: "pending",
      icon: <FaCar className="text-red-500" />,
      required: true,
      verificationType: "car",
    },
    {
      id: "6",
      title: "Trust Badge",
      description: "Complete additional verifications for trust badge",
      status: "not_started",
      icon: <FaUserShield className="text-indigo-500" />,
      required: false,
      verificationType: "trust",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "not_started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheck className="text-green-500" />;
      case "pending":
        return (
          <div className="w-4 h-4 border-2 border-yellow-500 rounded-full animate-spin" />
        );
      case "failed":
        return <FaTimes className="text-red-500" />;
      case "not_started":
        return null;
      default:
        return null;
    }
  };

  const calculateCompletion = () => {
    const completed = verificationItems.filter(
      (item) => item.status === "completed"
    ).length;
    const required = verificationItems.filter((item) => item.required).length;
    return Math.round((completed / required) * 100);
  };

  const handleFileUpload = (e) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleStartVerification = (item) => {
    setSelectedItem(item);
  };

  const handleCompleteVerification = () => {
    if (selectedItem) {
      setVerificationItems(
        verificationItems.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                status: "completed",
                lastUpdated: new Date().toISOString(),
              }
            : item
        )
      );
      setSelectedItem(null);
      setUploadedFiles([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Verification Progress</h3>
          <span className="text-2xl font-bold text-blue-600">
            {calculateCompletion()}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${calculateCompletion()}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Complete all required verifications to unlock full platform access
        </p>
      </div>

      {/* Verification Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {verificationItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>
                  {item.lastUpdated && (
                    <p className="text-xs text-gray-400 mt-2">
                      Last updated:{" "}
                      {new Date(item.lastUpdated).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status.replace("_", " ")}
                </span>
                {getStatusIcon(item.status)}
              </div>
            </div>
            <div className="mt-4">
              {item.status !== "completed" && (
                <button
                  onClick={() => handleStartVerification(item)}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {item.status === "not_started"
                    ? "Start Verification"
                    : "Continue Verification"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Verification Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                {selectedItem.icon}
                <h3 className="text-xl font-semibold">{selectedItem.title}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <p className="text-gray-600 mb-6">{selectedItem.description}</p>

            {selectedItem.verificationType === "id" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Government ID
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf"
                      className="hidden"
                      id="id-upload"
                    />
                    <label
                      htmlFor="id-upload"
                      className="cursor-pointer text-blue-500 hover:text-blue-600"
                    >
                      Click to upload or drag and drop
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Supported formats: JPG, PNG, PDF
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedItem.verificationType === "car" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Car Registration
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf"
                      className="hidden"
                      id="registration-upload"
                    />
                    <label
                      htmlFor="registration-upload"
                      className="cursor-pointer text-blue-500 hover:text-blue-600"
                    >
                      Click to upload or drag and drop
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Insurance Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf"
                      className="hidden"
                      id="insurance-upload"
                    />
                    <label
                      htmlFor="insurance-upload"
                      className="cursor-pointer text-blue-500 hover:text-blue-600"
                    >
                      Click to upload or drag and drop
                    </label>
                  </div>
                </div>
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Uploaded Files
                </h4>
                <ul className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{file.name}</span>
                      <button
                        onClick={() =>
                          setUploadedFiles(
                            uploadedFiles.filter((_, i) => i !== index)
                          )
                        }
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTimes />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setSelectedItem(null);
                  setUploadedFiles([]);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteVerification}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Complete Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
