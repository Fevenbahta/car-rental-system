"use client";

import { useState, useEffect } from "react";
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
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading2FA, setLoading2FA] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userData, setUserData] = useState({
    phone: "",
    email: "",
    name: "",
    profilePic: "",
  });
  const [showVerification, setShowVerification] = useState(false);
  const [otpData, setOtpData] = useState({
    phoneOtp: "",
    emailOtp: "",
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    // Get user data from localStorage
    const storedPhone = localStorage.getItem("userPhone");
    const storedName = localStorage.getItem("userName");
    const storedProfilePic = localStorage.getItem("userProfilePic");
    const storedEmail = localStorage.getItem("userEmail");
    const stored2FA = localStorage.getItem("twoFactorEnabled");

    if (storedPhone) {
      setUserData({
        phone: storedPhone,
        email: storedEmail || "",
        name: storedName || "User",
        profilePic: storedProfilePic || "https://via.placeholder.com/150",
      });
      setTwoFactorEnabled(stored2FA === "true");
    }
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (timer > 0 && verificationSent) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, verificationSent]);

  const sendVerificationCodes = async () => {
    try {
      setLoading2FA(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.post(
        "https://subbirr.com/api/send-verification-codes",
        {
          phone: userData.phone,
          email: userData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setVerificationSent(true);
      setSuccess("Verification codes have been sent to your phone and email");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Failed to send verification codes:", error);
      setError(
        error.response?.data?.message || "Failed to send verification codes"
      );
    } finally {
      setLoading2FA(false);
    }
  };

  const handleToggle2FA = async () => {
    if (!twoFactorEnabled && !showVerification) {
      setShowVerification(true);
      await sendVerificationCodes();
      return;
    }

    try {
      setLoading2FA(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.patch(
        "https://subbirr.com/api/user/toggle-2fa",
        {
          phone: userData.phone,
          email: userData.email,
          phone_otp: otpData.phoneOtp,
          email_otp: otpData.emailOtp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const new2FAStatus = !twoFactorEnabled;
      setTwoFactorEnabled(new2FAStatus);
      localStorage.setItem("twoFactorEnabled", new2FAStatus.toString());
      setShowVerification(false);
      setOtpData({ phoneOtp: "", emailOtp: "" });
      setVerificationSent(false);

      setSuccess(
        `Two-factor authentication ${
          new2FAStatus ? "enabled" : "disabled"
        } successfully`
      );
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Failed to toggle 2FA:", error);
      if (error.response?.status === 401) {
        setError("Session expired. Please log in again.");
      } else {
        setError(error.response?.data?.message || "Failed to toggle 2FA");
      }
    } finally {
      setLoading2FA(false);
    }
  };

  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.post(
        "https://subbirr.com/api/update-password",
        {
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
          new_password_confirmation: formData.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Password updated successfully");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Failed to update password:", error);
      setError(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.delete(
        "https://subbirr.com/api/account",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Clear all user data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userPhone");
        localStorage.removeItem("userName");
        localStorage.removeItem("userProfilePic");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("twoFactorEnabled");

        // Redirect to home page
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
      setError(error.response?.data?.message || "Failed to delete account");
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Change Password Section */}
      <div className="bg-white rounded-lg shadow p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
            {success}
          </div>
        )}

        <div className="flex items-center space-x-3 mb-6">
          <FaLock className="text-blue-500 text-xl" />
          <h2 className="text-2xl font-semibold">Account Security</h2>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p>Password requirements:</p>
            <ul className="list-disc list-inside mt-1">
              <li>At least 8 characters long</li>
              <li>Contains at least one uppercase letter</li>
              <li>Contains at least one lowercase letter</li>
              <li>Contains at least one number</li>
              <li>Contains at least one special character</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
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
            onClick={handleToggle2FA}
            disabled={loading2FA}
            className={`px-4 py-2 rounded-lg ${
              twoFactorEnabled
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition-colors`}
          >
            {loading2FA ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : twoFactorEnabled ? (
              "Disable 2FA"
            ) : (
              "Enable 2FA"
            )}
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

      {/* Two-Factor Authentication Verification Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* <FaShieldAlt className="text-blue-500" /> */}
            {/* <div>
              <h3 className="font-semibold">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">
                {twoFactorEnabled
                  ? "2FA is currently enabled for your account"
                  : "Add an extra layer of security to your account"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Verification codes will be sent to:
                <br />
                Phone: {userData.phone}
                <br />
                Email: {userData.email}
              </p>
            </div> */}
          </div>
          {/* <button
            onClick={handleToggle2FA}
            disabled={loading2FA}
            className={`px-4 py-2 rounded-lg ${
              twoFactorEnabled
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition-colors`}
          >
            {loading2FA ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : twoFactorEnabled ? (
              "Disable 2FA"
            ) : (
              "Enable 2FA"
            )}
          </button> */}
        </div>

        {showVerification && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Enter Verification Codes</h4>
            {!verificationSent && (
              <p className="text-sm text-gray-600 mb-4">
                Click the button above to receive verification codes
              </p>
            )}
            {verificationSent && (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Verification Code
                    </label>
                    <input
                      type="text"
                      name="phoneOtp"
                      value={otpData.phoneOtp}
                      onChange={handleOtpChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter code sent to your phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Verification Code
                    </label>
                    <input
                      type="text"
                      name="emailOtp"
                      value={otpData.emailOtp}
                      onChange={handleOtpChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter code sent to your email"
                    />
                  </div>
                </div>
                <button
                  onClick={sendVerificationCodes}
                  className="mt-4 text-sm text-blue-500 hover:text-blue-600"
                >
                  Resend verification codes
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
