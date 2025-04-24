"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [inputType, setInputType] = useState("email"); // Default to email
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    if (inputType === "email") {
      if (!email.endsWith("@gmail.com")) {
        setError("Please enter a valid Gmail address (e.g., your-email@gmail.com)");
        setIsLoading(false);
        return;
      }
    } else if (inputType === "phone") {
      if (!/^\d{10}$/.test(phone)) {
        setError("Please enter a valid 10-digit phone number.");
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-reset-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [inputType]: inputType === "email" ? email : phone }),
      });
    
      const data = await response.json();
    
      if (response.ok) {
        // Redirect to OTP verification page regardless of input type
        const contact = inputType === "email" ? email : formattedPhone;
        window.location.href = `/otpverification?${inputType}=${encodeURIComponent(contact)}`;
      } else {
        const messages = Object.values(data.errors || {}).flat().join(" ");
        setError(messages || data.message || "Failed to send OTP. Please try again.");
      }
    } 
     catch (error) {
      setError("An error occurred. Please check your network connection.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6 text-center">
      <h2 className="text-2xl font-bold mb-2">Forgot</h2>
      <img src="/cuate.png" alt="Cuate" className="mx-auto mb-5 mt-5  w-80 h-auto" />
      <h1 className="text-3xl font-bold mb-3">Forgot Password?</h1>
      <p className="text-gray-600 mb-6">
        Don’t worry! It happens. Please choose to enter either your email address or phone number.
      </p>

      {/* Input Type Selector */}
      <div className="flex justify-center space-x-4 mb-4">
  <button
    onClick={() => {
      setInputType("email");
      console.log("Email button clicked");
    }}
    className={`px-6 py-4 rounded-2xl border border-4 text-center shadow-sm transition-colors duration-200 ${
      inputType === "email"
        ? "border-blue-500 bg-white "
        : "border-gray-300 bg-white text-gray-800"
    }`}
  >
    Using Email
  </button>

  <button
    onClick={() => {
      setInputType("phone");
      console.log("Phone button clicked");
    }}
    className={`px-6 py-4 rounded-2xl border border-4 text-center shadow-sm transition-colors duration-200 ${
      inputType === "phone"
        ? "border-blue-500 bg-white "
        : "border-gray-300 bg-white text-gray-900"
    }`}
  >
    Using Phone
  </button>
</div>


      {/* Form */}
      <form onSubmit={handleSubmit} className="text-left">
        {inputType === "email" ? (
          <>
            <label htmlFor="email" className="block mb-2 text-lg font-semibold">
              Enter your email address:
            </label>
            <input
              type="email"
              id="email"
              placeholder="your-email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 mb-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        ) : (
          <>
            <label htmlFor="phone" className="block mb-2 text-lg font-semibold">
              Enter your phone number:
            </label>
            <input
              type="text"
              id="phone"
              placeholder="1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 mb-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Otp"}
        </button>
      </form>

      {error && (
        <div className="mt-5 text-red-600 font-medium">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
