"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaCamera } from "react-icons/fa";
import axios from "axios";

export default function BasicInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    birth_date: "",
    avatar: "/default-avatar.png",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        "https://www.carrentalbackend.emareicthub.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const userData = response.data;
      setProfileData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        city: userData.city || "",
        birth_date: userData.birth_date || "",
        avatar: userData.avatar || "/default-avatar.png",
      });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setError(error.response?.data?.message || "Failed to fetch profile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const formData = new FormData();
      Object.keys(profileData).forEach((key) => {
        if (key !== "avatar" && profileData[key] !== null) {
          formData.append(key, profileData[key]);
        }
      });

      if (profileData.avatar instanceof File) {
        formData.append("avatar", profileData.avatar);
      }

      const response = await axios.put(
        "https://www.carrentalbackend.emareicthub.com/api/users/me",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage({ type: "success", text: "Profile updated successfully" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
      setError(error.response?.data?.message || "Failed to update profile");
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Basic Information</h2>
        <button
          onClick={() => {
            if (isEditing) {
              handleSaveChanges();
            } else {
              setIsEditing(true);
            }
          }}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
          disabled={loading}
        >
          <FaEdit />
          <span>
            {isEditing
              ? loading
                ? "Saving..."
                : "Save Changes"
              : "Edit Profile"}
          </span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <img
              src={profileData.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <FaCamera className="text-white text-xl" />
              </label>
            )}
          </div>
        </div>

        {/* Profile Fields */}
        <div className="flex-grow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "First Name", name: "first_name" },
              { label: "Last Name", name: "last_name" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "tel" },
              { label: "Address", name: "address" },
              { label: "City", name: "city" },
              { label: "Birth Date", name: "birth_date", type: "date" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                {isEditing ? (
                  <input
                    type={type}
                    name={name}
                    value={profileData[name]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData[name]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
