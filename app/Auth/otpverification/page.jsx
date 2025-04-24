"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const VerifyOtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [otpError, setOtpError] = useState('');
  const [generalError, setGeneralError] = useState('');

  // Create refs for each OTP input
  const inputRefs = useRef([]);

  useEffect(() => {
    if (phone) {
      localStorage.setItem("userPhone", phone);
    }
  }, [phone]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);  // Ensure only one character is set
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOtpError('');
    setGeneralError('');

    if (otp.some(digit => digit === '')) {
      setOtpError("All OTP fields are required.");
      return;
    }

    const otpString = otp.join('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify-phone-otp`, {
        method: "POST",
        body: JSON.stringify({ phone, otp: otpString }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === "Invalid or expired OTP.") {
          setGeneralError("The OTP you entered is invalid or expired. Please try again.");
        } else {
          setGeneralError(data.message || "Failed to verify OTP. Please try again.");
        }
      } else {
        const user = data.user;
        localStorage.setItem('userPhone', user.phone);
        localStorage.setItem('userName', `${user.first_name} ${user.last_name}`);
        localStorage.setItem('userStatus', user.status);
        localStorage.setItem('userProfilePic', user.profile_picture || '/default-avatar.png');
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('token', data.token);
        router.push("/#hero");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setGeneralError("Network error. Please try again.");
    }
  };

  useEffect(() => {
    if (timer > 0 && otp.some(digit => digit === '')) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, otp]);

  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      setTimer(0);
    }
  }, [otp]);

  return (
    <div className="max-w-xl w-full mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-6">Enter OTP</h1>
      <img
        src="/otp.png"
        alt="OTP Illustration"
        className="mx-auto w-72 h-auto mb-5"
      />
      <p className="mb-4 text-gray-700">
        A 6-digit OTP has been sent to <strong>{phone}</strong>
      </p>

      {generalError && (
        <p className="text-red-600 font-medium mb-4">{generalError}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              ref={(el) => inputRefs.current[index] = el}  // Set ref to each input
              className="w-12 h-12 text-xl text-center border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {otpError && (
          <p className="text-red-600 mb-4 font-medium">{otpError}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Verify
        </button>
      </form>

      <p className="mt-4 text-gray-500">
        Resend OTP in {timer > 0 ? `${timer} seconds` : '00'}
      </p>
    </div>
  );
};

export default VerifyOtpPage;
