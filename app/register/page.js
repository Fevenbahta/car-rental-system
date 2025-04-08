"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./register.css"; // Optional: Add styles
import googleLogo from "./google-logo.png"; // Adjust the path as needed
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from './logo1.png'; // Replace with your actual logo path

const RegisterPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [driverLicence, setDriverLicence] = useState(null);
  const [digitalId, setDigitalId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for error messages
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState(""); // Added password error state
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Added confirm password error state
  const [generalError, setGeneralError] = useState(""); // Added general error state
  const [countryCode, setCountryCode] = useState("+251");

  const handleDriverLicenceChange = (e) => {
    setDriverLicence(e.target.files[0]);
  };

  const handleDigitalIdChange = (e) => {
    setDigitalId(e.target.files[0]);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{9}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error states
    setEmailError("");
    setPhoneError("");
    setPasswordError(""); // Reset password error state
    setConfirmPasswordError(""); // Reset confirm password error state
    setGeneralError(""); // Reset general error state

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid Gmail address.");
      return;
    }

    // Validate phone number
    if (!validatePhone(phone)) {
      setPhoneError("Phone number must be exactly 9 digits.");
      return;
    }

    
    if (password.length <= 6    ) {
      setPasswordError('Password must be at least 6 characters and include letters and numbers');
      return;
    }

    // Validate password and confirm password match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    let formattedPhone = phone;
    if (formattedPhone.length === 9) {
      formattedPhone = "0" + formattedPhone;
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);
    formData.append("phone", formattedPhone); // Use formatted phone number
    formData.append("role", role);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("birth_date", birthDate);

    // Append files
    if (driverLicence) formData.append("driver_liscence", driverLicence);
    if (digitalId) formData.append("digital_id", digitalId);

    try {
      const response = await fetch("https://www.carrental.emareicthub.com/api/register", {
        method: "POST",
        body: formData,
      });
    
      const data = await response.json();
    
      if (response.ok) {
        if (data.user?.role === "admin") {
          setRole("user");
        }

        // Pass phone number to OTP page after registration
        router.push(`/otpverification?phone=${formattedPhone}`);

      } else {
        console.error("API Errors:", JSON.stringify(data, null, 2)); // ✅ Proper logging
    
        if (data.errors && typeof data.errors === "object") {
          // Extract and flatten error messages
          const messages = Object.values(data.errors).flat().join(" ");
          setGeneralError(messages);
        } else {
          setGeneralError("Something went wrong. Please try again.");
        }
      }
    
    } catch (error) {
      console.error("Error:", error);
    
      if (error instanceof TypeError) {
        setGeneralError("Network error. Please try again.");
      } else {
        try {
          const errorData = await error.json?.();
          if (errorData?.errors && typeof errorData.errors === "object") {
            const messages = Object.values(errorData.errors).flat().join(" ");
            setGeneralError(messages);
          } else {
            setGeneralError("Something went wrong. Please try again.");
          }
        } catch {
          setGeneralError("Something went wrong. Please try again.");
        }
      }
    }
    
  }    
  return (
    <div
    className="container"
    style={{
      width: "1600px",  // Increased width
      margin: "50px auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      textAlign: "center",
    }}
    >
        <div className="text-center mb-6">
                <img src={Logo.src} alt="Logo" className="w-32 mx-auto" /> {/* Logo at the top */}
              </div>
      <h1>Register</h1>

      {/* Display General Error Message */}
     

      <form onSubmit={handleSubmit}>
        {/* First Name and Last Name side by side */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="first_name">Enter First Name:</label>
            <input
              type="text"
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={{ width: "100%", height: "40px", marginTop: "5px" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="last_name">Enter Last Name:</label>
            <input
              type="text"
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={{ width: "100%", height: "40px", marginTop: "5px" }}
            />
          </div>
        </div>

        {/* Email and Phone side by side */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", height: "40px", marginTop: "5px" }}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>

          <div style={{ flex: 1 }}>
  <label htmlFor="phone">Enter Phone Number:</label>
  <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
    <select
      value={countryCode}
      onChange={(e) => setCountryCode(e.target.value)}
      className="border rounded-md px-4 py-3 text-lg"
    >
      <option value="+251">🇪🇹 +251</option>
      <option value="+1">🇺🇸 +1</option>
      <option value="+44">🇬🇧 +44</option>
      <option value="+91">🇮🇳 +91</option>
    </select>

    <input
      type="tel"
      id="phone"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      required
      style={{ flex: 1, height: "40px" }}
      placeholder="987654321"
    />
  </div>
  {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
</div>

        </div>

        {/* Password and Confirm Password side by side */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="password">Enter Password:</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", height: "40px", marginTop: "5px" }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ width: "100%", height: "40px", marginTop: "5px" }}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {confirmPasswordError && <p style={{ color: "red" }}>{confirmPasswordError}</p>}
          </div>
        </div>

        {/* Address and City side by side */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{ width: "100%", height: "40px", marginTop: "5px" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              style={{ width: "100%", height: "40px", marginTop: "5px" }}
            />
          </div>
        </div>

        {/* Birth Date */}
        <div style={{ width: "100%", textAlign: "left" }}>
  <label htmlFor="birth_date" style={{ display: "block" }}>Enter Birth Date:</label>
  <input
    type="date"
    id="birth_date"
    value={birthDate}
    onChange={(e) => setBirthDate(e.target.value)}
    required
    style={{ width: "50%", height: "40px", marginTop: "5px", display: "inline-block" }}
  />
</div>

        <div style={{ marginBottom: "20px" }}>
              </div>

        {/* Upload Files */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="driver_licence">Upload Driver's Licence:</label>
          <input
            type="file"
            id="driver_licence"
            onChange={handleDriverLicenceChange}
            required
            style={{ marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="digital_id">Upload Digital ID:</label>
          <input
            type="file"
            id="digital_id"
            onChange={handleDigitalIdChange}
            required
            style={{ marginTop: "5px" }}
          />
        </div>
        {generalError && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          <p>{generalError}</p>
        </div>
      )}
        <button type="submit" className="primary">
          Sign Up
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Don’t have an account?{" "}
        <a href="/login" style={{ color: "blue", fontWeight: "bold", marginLeft: "5px" }}>
          Sign In
        </a>
      </p>

      <p>or</p>

      <button className="social-button">
        <img src={googleLogo.src} alt="Google Logo" />
        Continue with Google
      </button>
    </div>
  );
};

export default RegisterPage;
