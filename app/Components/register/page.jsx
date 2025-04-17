'use client';
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterModal = ({ isOpen, onClose, onShowLogin }) => {
  if (!isOpen) return null;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+251");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [driverLicence, setDriverLicence] = useState(null);
  const [digitalId, setDigitalId] = useState(null);
  const [passport, setPassport] = useState(null);  // State for Passport
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };
  const randomPassword = generateRandomPassword();

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const validatePhone = (phone) => /^\d{9}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(""); setPhoneError(""); setPasswordError(""); setConfirmPasswordError(""); setGeneralError("");

    if (!validateEmail(email)) return setEmailError("Enter a valid Gmail.");
    if (!validatePhone(phone)) return setPhoneError("Phone must be 9 digits.");
    if (password.length <= 6) return setPasswordError("Password too short.");
    if (password !== confirmPassword) return setConfirmPasswordError("Passwords do not match.");

    let formattedPhone = phone.length === 9 ? "0" + phone : phone;
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);
    formData.append("phone", formattedPhone);
    formData.append("role", "user");
    formData.append("address", address);
    formData.append("city", city);
    formData.append("birth_date", birthDate);
    if (driverLicence) formData.append("driver_liscence", driverLicence);
    if (digitalId) formData.append("digital_id", digitalId);
    if (passport) formData.append("passport", passport);  // Append passport

    try {
      const res = await fetch("https://www.carrental.emareicthub.com/api/register", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        window.location.href = `/otpverification?phone=${formattedPhone}`;
      } else {
        const messages = Object.values(data.errors || {}).flat().join(" ");
        setGeneralError(messages || "Something went wrong.");
      }
    } catch {
      setGeneralError("Network error. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="backdrop-blur-md  bg-white/50 w-full max-w-6xl rounded-lg shadow-2xl relative px-6 py-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        <div className="text-center mb-4">
          <img src="/logo1.png" alt="Logo" className="mx-auto w-16" />
          <h2 className="text-xl font-semibold mt-2">Register an Account</h2>
        </div>

        {generalError && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{generalError}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="First Name" value={firstName} onChange={setFirstName} />
            <Input label="Last Name" value={lastName} onChange={setLastName} />
            <Input label="Email" value={email} onChange={setEmail} error={emailError} type="email" />
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <div className="flex gap-2">
                <select
                  className="border px-2 py-2 rounded w-24"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+251">🇪🇹 +251</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+91">🇮🇳 +91</option>
                </select>
                <input
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              {phoneError && <p className="text-red-600 text-xs mt-1">{phoneError}</p>}
            </div>

            <PasswordInput
              label="Password"
              value={password}
              onChange={setPassword}
              error={passwordError}
              show={showPassword}
              toggleShow={() => setShowPassword(!showPassword)}
              suggestion={randomPassword}
            />
            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={confirmPasswordError}
              show={showConfirmPassword}
              toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <Input label="Address" value={address} onChange={setAddress} />
            <Input label="City" value={city} onChange={setCity} />
            <Input label="Birth Date" type="date" value={birthDate} onChange={setBirthDate} />
            <FileInput label="Driver's Licence" onChange={setDriverLicence} />
            <FileInput label="Digital ID" onChange={setDigitalId} />

            {/* Passport input field */}
            <FileInput label="Passport" onChange={setPassport} />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-28 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg mt-5 font-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center mt-4 space-y-1">
          <p className="text-sm">
            Already have an account?{" "}
            <button
              onClick={onShowLogin}
              className="text-blue-600 font-bold hover:underline"
            >
              Login
            </button>
          </p>
          <p className="text-gray-900 text-sm">or</p>
          <a href="https://www.carrental.emareicthub.com/api/auth/google">
            <button className="flex items-center gap-2 border mx-auto px-10 py-2 rounded bg-gray-100">
              <img src="/google-logo.png" alt="Google" className="w-7 h-7" />
              <span className="text-sm">Continue with Google</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const Input = ({ label, value, onChange, error = "", type = "text" }) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <input
      className="w-full border border-gray-300 rounded px-3 py-2"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
  </div>
);

const PasswordInput = ({ label, value, onChange, error, show, toggleShow, suggestion }) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <div className="relative">
      <input
        className="w-full border border-gray-300 rounded px-3 py-2"
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
      <span
        onClick={toggleShow}
        className="absolute top-2.5 right-3 text-gray-500 cursor-pointer"
      >
        {show ? <FaEye /> : <FaEyeSlash />}
      </span>
    </div>
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    {suggestion && !value && (
      <p className="text-gray-400 text-xs mt-1">Suggested: <strong>{suggestion}</strong></p>
    )}
  </div>
);

const FileInput = ({ label, onChange }) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <input
      className="w-full"
      type="file"
      onChange={(e) => onChange(e.target.files[0])}
      required
    />
  </div>
);

export default RegisterModal;
