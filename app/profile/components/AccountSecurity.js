"use client";

import { useState } from "react";
import {
  FaShieldAlt,
  FaTrash,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import axios from "axios";

export default function AccountSecurity() {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      if (formData.new_password !== formData.new_password_confirmation) {
        throw new Error("New passwords do not match");
      }

      const response = await axios.post(
        "https://www.carrentalbackend.emareicthub.com/api/update-password",
        {
          current_password: formData.current_password,
          new_password: formData.new_password,
          new_password_confirmation: formData.new_password_confirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage({
        type: "success",
        text: "Password updated successfully",
      });
      setFormData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (error) {
      console.error("Password update failed:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update password",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    // Add account deletion logic here
    console.log("Account deletion requested");
    setShowDeleteConfirm(false);
  };

  return (
    <div className="space-y-6">
      {/* Change Password Section */}
      <div className="bg-white rounded-lg shadow p-6">
        {message.text && (
          <div
            className={`mb-4 p-4 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex items-center space-x-3 mb-6">
          <FaLock className="text-blue-500 text-xl" />
          <h2 className="text-2xl font-semibold">Account Security</h2>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                name="current_password"
                value={formData.current_password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="new_password"
                value={formData.new_password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="new_password_confirmation"
                value={formData.new_password_confirmation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Password Requirements
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Minimum 6 characters long</li>
            <li>• Include at least one number</li>
            <li>• Include at least one special character</li>
            <li>• Include both uppercase and lowercase letters</li>
          </ul>
        </div>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FaShieldAlt className="text-blue-500 text-xl" />
            <h2 className="text-2xl font-semibold">
              Two-Factor Authentication
            </h2>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              twoFactorEnabled
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {twoFactorEnabled ? "Enabled" : "Disabled"}
          </button>
        </div>
        <p className="text-gray-600">
          Add an extra layer of security to your account by enabling two-factor
          authentication. When enabled, you'll need to enter a verification code
          sent to your phone in addition to your password when signing in.
        </p>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-3 mb-6">
          <FaTrash className="text-red-500 text-xl" />
          <h2 className="text-2xl font-semibold">Delete Account</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete Account
        </button>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <h3 className="text-xl font-semibold mb-4">
                Confirm Account Deletion
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
