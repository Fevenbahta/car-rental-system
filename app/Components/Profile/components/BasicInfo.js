"use client";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaMars,
  FaVenus,
  FaChevronDown,
} from "react-icons/fa";
import axios from "axios";

export default function BasicInfo() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    gender: "",
    nationalId: "",
    licenseNumber: "",
    licenseExpiry: "",
    profilePic: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({});
  const [profilePicFile, setProfilePicFile] = useState(null);

  const genderOptions = [
    { value: "male", label: "Male", icon: "♂" },
    { value: "female", label: "Female", icon: "♀" },
  ];

  useEffect(() => {
    const stored = {
      name: localStorage.getItem("userName") || "",
      email: localStorage.getItem("userEmail") || "",
      phone: localStorage.getItem("userPhone") || "",
      address: localStorage.getItem("userAddress") || "",
      birthday: localStorage.getItem("userBirthday") || "",
      gender: localStorage.getItem("userGender") || "",
      nationalId: localStorage.getItem("userNationalId") || "",
      licenseNumber: localStorage.getItem("userLicenseNumber") || "",
      licenseExpiry: localStorage.getItem("userLicenseExpiry") || "",
      status: localStorage.getItem("userStatus") || "",
      profilePic:
        localStorage.getItem("userProfilePic") ||
        "https://via.placeholder.com/150",
    };
    setUserInfo(stored);
    setNewUserInfo(stored);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUserInfo((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateFields = () => {
    let valid = true;
    let newErrors = {};

    if (!newUserInfo.name.trim()) {
      valid = false;
      newErrors.name = "Name is required";
    }

    if (!/^[\d]{10,15}$/.test(newUserInfo.phone)) {
      valid = false;
      newErrors.phone = "Phone must be 10-15 digits";
    }

    if (!/^\S+@\S+\.\S+$/.test(newUserInfo.email)) {
      valid = false;
      newErrors.email = "Invalid email format";
    }

    if (!newUserInfo.licenseNumber.trim()) {
      valid = false;
      newErrors.licenseNumber = "License number is required";
    }

    if (!newUserInfo.address.trim()) {
      valid = false;
      newErrors.address = "Address is required";
    }

    if (!newUserInfo.gender) {
      valid = false;
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validateFields()) return;

    setUserInfo(newUserInfo);
    Object.entries(newUserInfo).forEach(([key, value]) => {
      localStorage.setItem(
        `user${key.charAt(0).toUpperCase() + key.slice(1)}`,
        value
      );
    });
    setIsEditing(false);
  };

  const renderInput = (label, name, type = "text") => {
    if (name === "gender") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <div className="relative">
            <select
              name="gender"
              value={newUserInfo.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 pr-10 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !isEditing ? "bg-gray-100" : ""
              } ${errors.gender ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Gender</option>
              <option value="male" className="flex items-center">
                <FaMars className="inline-block mr-2" />
                Male
              </option>
              <option value="female" className="flex items-center">
                <FaVenus className="inline-block mr-2" />
                Female
              </option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaChevronDown className="text-gray-400" />
            </div>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={newUserInfo[name]}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            !isEditing ? "bg-gray-100" : ""
          } ${errors[name] ? "border-red-500" : "border-gray-300"}`}
        />
        {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
      </div>
    );
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Basic Information
      </h2>

      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src={newUserInfo.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-200"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </label>
          )}
        </div>
        <div>
          <p className="text-xl font-medium text-gray-800">
            {userInfo.name || "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            {userInfo.status || "Unverified"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("Full Name", "name")}
        {renderInput("Email", "email")}
        {renderInput("Phone Number", "phone")}
        {renderInput("Address", "address")}
        {renderInput("Birthday", "birthday", "date")}
        {renderInput("Gender", "gender")}
        {renderInput("National ID / Passport No.", "nationalId")}
        {renderInput("Driver's License Number", "licenseNumber")}
        {renderInput("License Expiry Date", "licenseExpiry", "date")}
      </div>

      <div className="mt-8 flex justify-end gap-4">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition-colors"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}
